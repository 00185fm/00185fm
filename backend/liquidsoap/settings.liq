#!/usr/bin/liquidsoap

# Settings
settings.init.allow_root.set(true)
init.daemon.set(false)

log.stdout.set(true)
log.file.set(false)

settings.server.log.level.set(4)

settings.harbor.bind_addrs.set(["0.0.0.0"])

settings.tag.encodings.set(["UTF-8","ISO-8859-1"])
settings.encoder.metadata.export.set(["artist","title","album","song"])

setenv("TZ", "Europe/Rome")

# Track live-enabled status.
live_enabled = ref(false)
ignore(live_enabled)

# Track live transition for crossfades.
to_live = ref(false)
ignore(to_live)


radio_api_url = getenv("PB_NP")
api_token = getenv("LIQ_TOKEN")

def radio_api_post(~timeout_ms=2000, payload) =
    
    log("API - Sending POST request to '#{radio_api_url}' with body: #{payload}")
    try
        response = http.post(radio_api_url,
            headers=[
                ("Content-Type", "application/json"),
                ("User-Agent", "Liquidsoap 00185fm"),
                ("Authorization","#{api_token}")
            ],
            timeout_ms=timeout_ms,
            data=payload
        )
        
        log("API - Response (#{response.status_code}): #{response}")
        "#{response}"
    catch err do
        log("API - Error: #{error.kind(err)} - #{error.message(err)}")
        "false"
    end
end

pb_def_playlist = getenv("PB_DEF_PLAYLIST")
# Playlist
i_playlist = crossfade(
    duration=4.0,
    smart=true,
    playlist(mode='randomize',reload=600,pb_def_playlist)
)

# Error
error = single("/pb_public/fail.mp3")

# Live
def live_connected(header) =
    log("Live Source connected!")
    live_enabled := true
end

def live_disconnected() =
    log("Live Source disconnected!")
    live_enabled := false
end

live = input.harbor(getenv("LIVE_MOUNTPOINT"),port=4085,password=getenv("LIVE_PASSWORD"), icy = true, icy_metadata_charset = "UTF-8", metadata_charset = "UTF-8", on_connect = live_connected, on_disconnect = live_disconnected, buffer = 5.00, max = 10.00)

def insert_missing(m) =
    if m == [] then
        [("title", "Live Broadcast"), ("is_live", "true")]
    else
        [("is_live", "true")]
    end
end
live = metadata.map(insert_missing, live)

radio = fallback(id="live_fallback", replay_metadata=true, [live, error])

# Apply amplification metadata (if supplied)
radio = amplify(override="liq_amplify", 1., radio)

# Normalization and Compression
radio = normalize(target = 0., window = 0.03, gain_min = -16., gain_max = 0., radio)
radio = compress.exponential(radio, mu = 1.0)

# Full
radio = fallback(track_sensitive=false,[live,mksafe(i_playlist),error])

#Skip current
def skip_next(~protocol,~data,~headers,uri) =
    source.skip(radio)
    http.response(
        protocol=protocol,
        code=201,
        headers=[
            ("Content-Type", "application/json"),
            ("User-Agent", "Liquidsoap 00185fm")
        ],
        data="Song Skipped!"
    )
end

harbor.http.register(port=4080,method="GET","/nextsong",skip_next)


# Send metadata changes back to Server
last_title = ref("")
last_artist = ref("")

def metadata_updated(m) =
    def f() =
        if (m["title"] != !last_title or m["artist"] != !last_artist) then
            last_title := m["title"]
            last_artist := m["artist"]
            
            j = json()
            
            if (m["song_id"] != "") then
                j.add("song_id", m["song_id"])
                j.add("media_id", m["media_id"])
                j.add("playlist_id", m["playlist_id"])
            else
                j.add("artist", m["artist"])
                j.add("title", m["title"])
                j.add("slug", m["slug"])
                if(m["is_live"] == "true") then
                    j.add("is_live", true)
                else
                    j.add("is_live", false)
                end
            end
            
            _ = radio_api_post(
                json.stringify(j)
            )
        end
    end
    
    thread.run(f)
end

radio.on_metadata(metadata_updated)

# Output
output.icecast(
    %mp3(
        bitrate=320,
        id3v2=true
    ),
    name=getenv("STREAM_NAME"),
    description=getenv("STREAM_DESC"),
    url=getenv("STREAM_URL"),
    mount=getenv("STREAM_MOUNTPOINT"),
    password=getenv("ICECAST_SOURCE_PASSWORD"),
    host="icecast",
    port=8000,
    encoding="UTF-8",
    radio
)
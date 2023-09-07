routerAdd(
  "POST",
  "/radio/nowplaying",
  (c) => {
    const token = c.request().header.get("Authorization");

    console.log(JSON.stringify(token));
    if (token === $os.getenv("LIQ_TOKEN")) {
      const np = new DynamicModel({
        title: "Title",
        artist: "Artist",
        is_live: false,
        slug: "",
      });
      c.bind(np);
      try {
        const record = $app
          .dao()
          .findRecordById("nowplaying", $os.getenv("NOW_PLAYING_ID"));
        record.set("title", np.title);
        record.set("artist", np.artist);
        record.set("is_live", np.is_live);
        record.set("slug", np.slug);
        $app.dao().saveRecord(record);
      } catch (error) {
        return c.json(404, { message: "Error!", error });
      }
      return c.json(200, { message: "Well done!" });
    } else {
      return c.json(404, { message: "Not Authorized" });
    }
  } /* optional middlewares */
);

routerAdd("GET", "/playlists/:title", (c) => {
  const collection = $app.dao().findCollectionByNameOrId("episodes");

  function findByPlaylist() {
    let title = c.pathParam("title").split(".")[0];
    const playlist = new Record();
    $app
      .dao()
      .recordQuery("playlists")
      .andWhere($dbx.hashExp({ title: title }))
      .limit(1)
      .one(playlist);

    const records = $app.dao().findRecordsByFilter(
      "episodes", // collection

      "playlists ~'" + playlist.id + "'" // filter
    );

    return records;
  }

  String.prototype.clean = function () {
    return this.toString()
      .normalize("NFD") // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
      .trim()
      .replace(/['"“”^<>.;:,]/g, "")
      .replace(/\s+/g, " ");
  };

  let string = "#EXTM3U\n\n";
  try {
    const episodes = findByPlaylist();
    episodes.forEach((e) => {
      if (e.getString("audio") !== "") {
        const title = e.getString("title").clean();
        const artist = e.getString("author").clean();

        string +=
          "#EXTINF:" +
          "title='" +
          title +
          "'," +
          "artist='" +
          artist +
          "'," +
          "slug='" +
          e.getString("slug") +
          "'," +
          "\n" +
          $os.getenv("PB_FILES_URL") +
          collection.id +
          "/" +
          e.getString("id") +
          "/" +
          e.getString("audio") +
          "\n\n";
      }
    });
  } catch (error) {
    string = "#EXTM3U";
  }

  return c.string(200, string);
});

/// <reference path="../pb_data/types.d.ts" />

cronAdd("publish_episodes", "@daily", () => {
  const raw_max = new Date().setHours(23, 59, 59, 999);
  const max = new Date(raw_max).toISOString();
  function findPrivateEpisodes() {
    const records = arrayOf(new Record());
    $app
      .dao()
      .recordQuery("episodes")
      .andWhere($dbx.hashExp({ public: false }))
      .andWhere($dbx.exp("date <= {:max}"))
      .andBind({
        max: max,
      })
      .orderBy("date ASC")
      .all(records);

    return records;
  }

  const episodes = findPrivateEpisodes();
  const playlist_id = $os.getenv("DEF_PLAYLIST_ID");

  episodes.forEach((episode) => {
    episode.set("public", true);
    episode.set("playlists", [playlist_id]);
    $app.dao().saveRecord(episode);
  });
});

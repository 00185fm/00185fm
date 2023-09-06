// /// <reference path="../pb_data/types.d.ts" />
// migrate((db) => {
//   const dao = new Dao(db);

//   const settings = dao.findSettings();
//   settings.meta.appName = "00185fm";
//   settings.logs.maxDays = 2;
//   // settings.s3.enabled = true;
//   // settings.s3.endpoint = "";
//   // settings.s3.bucket = "";
//   // settings.s3.region = "";
//   // settings.s3.accessKey = "";
//   // settings.s3.secret = "";
//   // settings.s3.validate();

//   dao.saveSettings(settings);
// });

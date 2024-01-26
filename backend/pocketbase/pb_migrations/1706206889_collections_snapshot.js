/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2023-08-30 11:48:17.407Z",
      "updated": "2023-08-30 11:58:59.372Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [],
      "indexes": [],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": false,
        "allowUsernameAuth": false,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "onlyVerified": false,
        "requireEmail": false
      }
    },
    {
      "id": "j26urls6zbpgw7g",
      "created": "2023-08-30 11:58:59.371Z",
      "updated": "2024-01-24 19:57:09.454Z",
      "name": "schedules",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "hxzgyzzq",
          "name": "info",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "8b4fqy0h",
          "name": "date",
          "type": "date",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "eq4mmykt",
          "name": "manual",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "cpgulaa4gcbbzm8",
      "created": "2023-08-30 11:58:59.371Z",
      "updated": "2023-09-13 13:16:42.127Z",
      "name": "tags",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "leomutaz",
          "name": "tag",
          "type": "text",
          "required": false,
          "presentable": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_IiQaROL` ON `tags` (`tag`)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "ymrl6gbbiznw3ii",
      "created": "2023-08-30 11:58:59.372Z",
      "updated": "2023-09-15 10:52:58.814Z",
      "name": "nowplaying",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "pzmwsrdy",
          "name": "title",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "fuc3pxn9",
          "name": "artist",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "wniocd3s",
          "name": "is_live",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "vhbro1m7",
          "name": "slug",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "d3tzebck",
          "name": "episode",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "4ocj0wdpxqjifls",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "xgqcerg0a0evy4w",
      "created": "2023-08-30 11:58:59.372Z",
      "updated": "2023-09-13 13:15:55.805Z",
      "name": "playlists",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "8dttqbcn",
          "name": "title",
          "type": "text",
          "required": false,
          "presentable": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_5HKo4ij` ON `playlists` (`title`)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "4ocj0wdpxqjifls",
      "created": "2023-08-30 11:58:59.372Z",
      "updated": "2023-10-29 20:31:00.804Z",
      "name": "episodes",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "fl271xoz",
          "name": "public",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "sptffw30",
          "name": "title",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "jhqzavno",
          "name": "author",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "a9bxmvdz",
          "name": "date",
          "type": "date",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "lqcvpxqv",
          "name": "description",
          "type": "editor",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "convertUrls": false
          }
        },
        {
          "system": false,
          "id": "woa1cjx7",
          "name": "tracklist",
          "type": "editor",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "convertUrls": false
          }
        },
        {
          "system": false,
          "id": "tfitct89",
          "name": "slug",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "dn7jupwj",
          "name": "audio",
          "type": "file",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "mimeTypes": [
              "audio/mpeg",
              "audio/flac",
              "audio/wav",
              "audio/aiff",
              "audio/aac",
              "audio/mp4"
            ],
            "thumbs": [],
            "maxSelect": 1,
            "maxSize": 500000000,
            "protected": false
          }
        },
        {
          "system": false,
          "id": "1hsovzhj",
          "name": "image",
          "type": "file",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "mimeTypes": [
              "image/png",
              "image/jpeg",
              "image/webp"
            ],
            "thumbs": [
              "300x300",
              "1000x1000",
              "20x20"
            ],
            "maxSelect": 1,
            "maxSize": 5242880,
            "protected": false
          }
        },
        {
          "system": false,
          "id": "w8f5jjvu",
          "name": "credits",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "bducp5so",
          "name": "show",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "zqs2e7bgkehjv49",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "lles2gbu",
          "name": "tags",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "cpgulaa4gcbbzm8",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": [
              "tag"
            ]
          }
        },
        {
          "system": false,
          "id": "vyc3q8b2",
          "name": "playlists",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "xgqcerg0a0evy4w",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": [
              "title"
            ]
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `idx_Vg36Lhg` ON `episodes` (`date`)",
        "CREATE UNIQUE INDEX `idx_PLWxydZ` ON `episodes` (\n  `title`,\n  `author`,\n  `show`\n)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "zqs2e7bgkehjv49",
      "created": "2023-08-30 11:58:59.373Z",
      "updated": "2023-11-09 19:06:23.893Z",
      "name": "shows",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "0phzwqxk",
          "name": "title",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "tadh9nol",
          "name": "author",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "0apt60c2",
          "name": "description",
          "type": "editor",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "convertUrls": false
          }
        },
        {
          "system": false,
          "id": "iwrakjpg",
          "name": "slug",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "becq87pj",
          "name": "image",
          "type": "file",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "mimeTypes": [
              "image/png",
              "image/jpeg",
              "image/webp"
            ],
            "thumbs": [
              "300x300",
              "1000x1000",
              "20x20"
            ],
            "maxSelect": 1,
            "maxSize": 5242880,
            "protected": false
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_hb3wfok` ON `shows` (\n  `title`,\n  `slug`\n)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "6hp0wa28phl452k",
      "created": "2023-08-30 11:58:59.373Z",
      "updated": "2023-10-29 20:31:00.832Z",
      "name": "episodes_show",
      "type": "view",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "osbyedrm",
          "name": "show",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "zqs2e7bgkehjv49",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "rmmrnz4m",
          "name": "count",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        }
      ],
      "indexes": [],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {
        "query": "SELECT episodes.id,episodes.show, COUNT(episodes.id) AS count\nFROM episodes\nGROUP BY show;"
      }
    },
    {
      "id": "gli4scynvnxelwc",
      "created": "2023-08-30 11:58:59.373Z",
      "updated": "2023-08-30 11:58:59.387Z",
      "name": "episodes_tag",
      "type": "view",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "9nta9mjt",
          "name": "tags",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "cpgulaa4gcbbzm8",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": [
              "tag"
            ]
          }
        },
        {
          "system": false,
          "id": "ypvfxrgb",
          "name": "episodes",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        }
      ],
      "indexes": [],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {
        "query": "SELECT episodes.id,episodes.tags, COUNT(episodes.id) AS episodes\nFROM episodes\nGROUP BY tags"
      }
    },
    {
      "id": "ou8sl6z9soeyh5z",
      "created": "2023-09-08 19:22:04.958Z",
      "updated": "2023-09-13 13:16:09.871Z",
      "name": "projects",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "byynius4",
          "name": "name",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "iiivekse",
          "name": "about",
          "type": "editor",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "convertUrls": false
          }
        },
        {
          "system": false,
          "id": "d6jyl2mf",
          "name": "impressum",
          "type": "editor",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "convertUrls": false
          }
        },
        {
          "system": false,
          "id": "zwivpzus",
          "name": "email",
          "type": "email",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "exceptDomains": null,
            "onlyDomains": null
          }
        },
        {
          "system": false,
          "id": "jhn5sqkb",
          "name": "support",
          "type": "url",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "exceptDomains": null,
            "onlyDomains": null
          }
        },
        {
          "system": false,
          "id": "4qeflcwg",
          "name": "telegram",
          "type": "url",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "exceptDomains": null,
            "onlyDomains": null
          }
        },
        {
          "system": false,
          "id": "j6dtdnhd",
          "name": "website",
          "type": "url",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "exceptDomains": null,
            "onlyDomains": null
          }
        },
        {
          "system": false,
          "id": "vl3ukoir",
          "name": "bandcamp",
          "type": "url",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "exceptDomains": null,
            "onlyDomains": null
          }
        },
        {
          "system": false,
          "id": "gteu8edf",
          "name": "youtube",
          "type": "url",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "exceptDomains": null,
            "onlyDomains": null
          }
        },
        {
          "system": false,
          "id": "f9h1pdhn",
          "name": "facebook",
          "type": "url",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "exceptDomains": null,
            "onlyDomains": null
          }
        },
        {
          "system": false,
          "id": "wtfifa7m",
          "name": "instagram",
          "type": "url",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "exceptDomains": null,
            "onlyDomains": null
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "s25kd8k8sh7roim",
      "created": "2023-10-28 14:22:43.620Z",
      "updated": "2023-10-29 20:28:22.472Z",
      "name": "scheduled_items",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "n6tvt3lq",
          "name": "title",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "oic2fqtq",
          "name": "artist",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "9w83i08o",
          "name": "date",
          "type": "date",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "cf5uscya",
          "name": "schedule",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "j26urls6zbpgw7g",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "rhdiktop",
          "name": "episode",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "4ocj0wdpxqjifls",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})

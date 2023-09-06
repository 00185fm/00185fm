// /// <reference path="../pb_data/types.d.ts" />
// migrate(
//   (db) => {
//     const admin = new Admin();

//     admin.email = "admin@00185fm.eu";
//     admin.setPassword("1234567890");

//     return Dao(db).saveAdmin(admin);
//   },
//   (db) => {
//     const dao = new Dao(db);

//     const admin = dao.findAdminByEmail("admin@00185fm.eu");

//     return dao.deleteAdmin(admin);
//   }
// );

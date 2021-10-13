const firebaseApp = require("firebase/app");
const firebaseAuth = require("firebase/auth");
const firebaseDB = require("firebase/database");
const app = require('./fire-base.js')
 
firebaseDB.getDatabase(app)
 
module.exports = {
   signUp: async (email, password) => {
       const auth = firebaseAuth.getAuth();
  
       firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
           .then((userCredential) => {
               const user = userCredential.user;
               console.log(user.uid)
           })
           .catch((error) => {
               console.log(error.code);
               console.log(error.message);
           });
   },
  
   getById: async (url, id, cb) => {
       /**
        * @param url: Đường dẫn tới thằng cha. VD: "/BoardGames"
        * @param id: id của board game cần xóa
        * @param cb: Hàm nhận vào 1 tham số, chạy sau khi có kết quả trả về.
        *            Nhận vào data nếu get thành công, Nếu data không có sẽ nhận vào "NO_DATA", object error nếu thất bại
        */
       const database = firebaseDB.getDatabase();
       const snapshot = await firebaseDB.get(firebaseDB.ref(database, `${url}/${id}`))
       if (snapshot.exists()) {
           cb(snapshot.val());  
       } else {
           cb("NO_DATA");
       }
   },
  
   getAll: async (url) => {
       /**
        * @param url: Đường dẫn tới thằng cha. VD: "/BoardGames"
        * @param id: id của board game cần xóa
        * @param cb: Hàm nhận vào 1 tham số, chạy sau khi có kết quả trả về.
        *            Nhận vào data nếu get thành công, Nếu data không có sẽ nhận vào "NO_DATA", object error nếu thất bại
        */
       const database = firebaseDB.getDatabase();
       const snapshot = await firebaseDB.get(firebaseDB.ref(database, `${url}`))
       if (snapshot.exists()) {
           return snapshot.val()
       } else {
           return "NO_DATA"
       }
   },
  
   add: async (url, boardGame) =>  {
       const database = firebaseDB.getDatabase();
       const data = await firebaseDB.set(firebaseDB.ref(database, `${url}/${boardGame.id}`), boardGame)
       return data
   },
  
   updateById: async (url, id, data) => {
       /**
        * url: Đường dẫn tới thằng cha. VD: /BoardGames
        * id: id của board game cần update
        * boardGame: Đối tượng BoardGame chứa các field cần thay đổi
        * cb: Hàm nhận vào 1 tham số, chạy sau khi có kết quả trả về
        */
       const res = firebaseDB.update(firebaseDB.ref(database, `${url}/${id}`), data)
       return res
           // .then(() => {
           //     cb("Update successfully!")
           // })
           // .catch(error => {
           //     cb(error)
           // });
   },
  
   deleteById: (url, id) => {
       /**
        * @param url: Đường dẫn tới thằng cha. VD: /BoardGames
        * @param id: id của board game cần xóa
        * @param cb: Hàm nhận vào 1 tham số, chạy sau khi có kết quả trả về.
        *            Nhận vào "OK" nếu delete thành công, object error nếu thất bại
        */
       const data =  firebaseDB.remove(firebaseDB.ref(database, `${url}/${id}`))
       return data
   }
}
 
 
 
 
 
// const boardGame = {
//     age: 5,
//     // category: 'BoardGameCategoryId2',
//     // description: '',
//     // difficultLevel: 2,
//     id: 'BoardGameId7',
//     // image: '',
//     // name: 'Board Game 33',
//     numPlayerFrom: 33,
//     numPlayerTo: 22,
//     playingTime: 11,
//     price: 40000
// };
 
// // updateById("/BoardGames", boardGame.id, boardGame, (param) => {
// //     console.log(param);
// // })
 
 
 
// // getById("/BoardGames", "BoardGameId7", (param) => {
// //     console.log(param);
// // })
 
// updateById("/BoardGames", boardGame.id, boardGame, (param) => {
//     console.log(param);
// })
 
// deleteById("/BoardGames", boardGame.id, (param) => {
//     // Do something
// })


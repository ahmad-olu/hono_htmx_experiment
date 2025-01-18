import PocketBase from "pocketbase";

export const pbDb = new PocketBase("http://127.0.0.1:8090");

// // authenticate as auth collection record
// const userData = await pb.collection('users').authWithPassword('test@example.com', '123456');

// // list and filter "example" collection records
// const result = await pb.collection('example').getList(1, 20, {
//     filter: 'status = true && created > "2022-08-01 10:00:00"'
// });

// and much more...

import category from "./category";

console.log(category(undefined, {}));

describe("category reducer", () => {
  it("should handle initial state", () => {
    expect(category(undefined, {})).toEqual({});
  });
});

// {  categories:{
//       entities:{
//         category:{
//           react:{
//             name:"react",
//             path:"react"
//           },
//           redux:{
//             name:"react",
//             path:"react"
//           },
//           udacity:{
//             name:"react",
//             path:"react"
//           }
//         }
//       },
//       result:{
//         categories:[
//           "react",
//           "redux",
//           "udacity"
//         ]
//       }
//     }

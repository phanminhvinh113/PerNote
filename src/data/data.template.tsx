// import { IDataBoard } from "@/types/Data.type";
/**

 * Created on Oct 6, 2023
//  */
// export const mockData: IDataBoard = {
//   board: {
//     _id: "board-id-01",
//     title: " Stack Board",
//     description: "Description About Board",
//     type: "public", // 'private'
//     ownerIds: [], // Những users là Admin của board
//     memberIds: [], // Những users là member bình thường của board
//     columnOrderIds: ["column-id-02", "column-id-01", "column-id-03"], // Thứ tự sắp xếp / vị trí của các Columns trong 1 boards
//     columns: [
//       {
//         _id: "column-id-01",
//         boardId: "board-id-01",
//         title: "To Do Column 01",
//         cardOrderIds: [
//           "card-id-01",
//           "card-id-02",
//           "card-id-03",
//           "card-id-04",
//           "card-id-05",
//           "card-id-06",
//           "card-id-07",
//         ],
//         cards: [
//           {
//             _id: "card-id-01",
//             boardId: "board-id-01",
//             columnId: "column-id-01",
//             title: "Title of card 01",
//             description: "Markdown Syntax ",
//             cover:
//               "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=2000",
//             memberIds: ["test-user-id-01"],
//             comments: ["test comment 01", "test comment 02"],
//             attachments: ["test attachment 01", "test attachment 02", "test attachment 03"],
//           },
//           {
//             _id: "card-id-02",
//             boardId: "board-id-01",
//             columnId: "column-id-01",
//             title: "Title of card 02",
//             description: null,
//             cover: null,
//             memberIds: [],
//             comments: [],
//             attachments: [],
//           },
//           {
//             _id: "card-id-03",
//             boardId: "board-id-01",
//             columnId: "column-id-01",
//             title: "Title of card 03",
//             description: null,
//             cover: null,
//             memberIds: [],
//             comments: [],
//             attachments: [],
//           },
//           {
//             _id: "card-id-04",
//             boardId: "board-id-01",
//             columnId: "column-id-01",
//             title: "Title of card 04",
//             description: null,
//             cover: null,
//             memberIds: [],
//             comments: [],
//             attachments: [],
//           },
//           {
//             _id: "card-id-05",
//             boardId: "board-id-01",
//             columnId: "column-id-01",
//             title: "Title of card 05",
//             description: null,
//             cover: null,
//             memberIds: [],
//             comments: [],
//             attachments: [],
//           },
//           {
//             _id: "card-id-06",
//             boardId: "board-id-01",
//             columnId: "column-id-01",
//             title: "Title of card 06",
//             description: null,
//             cover: null,
//             memberIds: [],
//             comments: [],
//             attachments: [],
//           },
//           {
//             _id: "card-id-07",
//             boardId: "board-id-01",
//             columnId: "column-id-01",
//             title: "Title of card 07",
//             description: null,
//             cover: null,
//             memberIds: [],
//             comments: [],
//             attachments: [],
//           },
//         ],
//       },
//       {
//         _id: "column-id-02",
//         boardId: "board-id-01",
//         title: "Inprogress Column 02",
//         cardOrderIds: ["card-id-08", "card-id-09", "card-id-10"],
//         cards: [
//           {
//             _id: "card-id-08",
//             boardId: "board-id-01",
//             columnId: "column-id-02",
//             title: "Title of card 08",
//             description: null,
//             cover: "https://t4.ftcdn.net/jpg/05/25/08/09/240_F_525080936_JEpnKXh2siYKBPpsqd98pbbcIzy4ySKz.jpg",
//             memberIds: [],
//             comments: [],
//             attachments: [],
//           },
//           {
//             _id: "card-id-09",
//             boardId: "board-id-01",
//             columnId: "column-id-02",
//             title:
//               "MUI offers a comprehensive suite of free UI tools to help you ship new features faster. Start with Material ",
//             description: null,
//             cover: null,
//             memberIds: [],
//             comments: [],
//             attachments: [],
//           },
//           {
//             _id: "card-id-10",
//             boardId: "board-id-01",
//             columnId: "column-id-02",
//             title: "Title of card 10",
//             description: null,
//             cover: null,
//             memberIds: [],
//             comments: [],
//             attachments: [],
//           },
//         ],
//       },
//       {
//         _id: "column-id-03",
//         boardId: "board-id-01",
//         title: "Done Column 03",
//         cardOrderIds: ["card-id-11", "card-id-12", "card-id-13"],
//         cards: [
//           {
//             _id: "card-id-11",
//             boardId: "board-id-01",
//             columnId: "column-id-03",
//             title: "Title of card 11",
//             description: null,
//             cover: "https://as1.ftcdn.net/v2/jpg/05/81/21/88/1000_F_581218857_VnEW8mszLYkSsgLXuRFO6K36Phhxsupg.jpg",
//             memberIds: [],
//             comments: [],
//             attachments: [],
//           },
//           {
//             _id: "card-id-12",
//             boardId: "board-id-01",
//             columnId: "column-id-03",
//             title: "Title of card 12",
//             description: null,
//             cover: "https://t3.ftcdn.net/jpg/05/71/06/76/240_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg ",
//             memberIds: [],
//             comments: [],
//             attachments: [],
//           },
//           {
//             _id: "card-id-13",
//             boardId: "board-id-01",
//             columnId: "column-id-03",
//             title: "Title of card 13",
//             description: null,
//             cover: null,
//             memberIds: [],
//             comments: [],
//             attachments: [],
//           },
//         ],
//       },
//     ],
//   },
// };
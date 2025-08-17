// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
// .then(()=>{
//     console.log("connected to db");
// })
// .catch((err)=>{
// console.log(err);
// });

// async function main(){
//     await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj)=>({
//         ...obj,
//         owner:"6656ef1c82ccb0472d5f884d",
//     }));
//     await Listing.insertMany(initData.data);
//     console.log("data was initialized");
// };

// initDB();


// 1. Require dotenv at the very top to load variables from .env
require('dotenv').config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// 2. Read the database URL from the environment variables
// This will use the URL from your .env file when you run it locally,
// and it will use the URL you set in the Vercel dashboard when it runs on Vercel.
const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  if (!MONGO_URL) {
    console.error("Error: MONGO_URL is not defined. Please check your .env file or Vercel environment variables.");
    return;
  }
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6656ef1c82ccb0472d5f884d", // Note: This owner ID is hardcoded
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
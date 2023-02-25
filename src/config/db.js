import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

mongoose.connect(process.env.DB_URI);

let db = mongoose.connection;

export default db;
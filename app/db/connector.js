import mongoose from "mongoose";
import mongodb_url from "../config";

export default function () {
    mongoose.connect(mongodb_url)
}
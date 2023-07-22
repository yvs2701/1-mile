import mongoose, { Schema } from "mongoose"

const RoomSchema = new Schema({
  status: String
})

export default mongoose.models.Room ?? mongoose.model("Room", RoomSchema)
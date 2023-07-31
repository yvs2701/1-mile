import mongoose, { Schema } from "mongoose"

type TRoom = {
  status: 'waiting' | 'chatting'
}

const RoomSchema = new Schema<TRoom>({
  status: String
})

export default mongoose.models.Room as mongoose.Model<TRoom> ?? mongoose.model<TRoom>("Room", RoomSchema)
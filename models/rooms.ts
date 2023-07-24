import mongoose, { Schema } from "mongoose"

type TRoom = {
  status: string
}

const RoomSchema = new Schema<TRoom>({
  status: String
})

export default mongoose.models.Room as mongoose.Model<TRoom> ?? mongoose.model<TRoom>("Room", RoomSchema)
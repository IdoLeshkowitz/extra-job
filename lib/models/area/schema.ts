import mongoose, {models, Schema} from "mongoose";
export interface Area {
    _id?: typeof mongoose.Schema.Types.ObjectId
    name: string
}
const areaSchema = new Schema<Area>({
    name: {
        type: String,
        require: true,
        unique: true,
    }
})
areaSchema.index({name: 1}, {unique: true})
export default models.area || mongoose.model<Area>('area', areaSchema)
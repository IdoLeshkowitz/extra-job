import areaSchema, {Area} from "./schema"

export const getAllAreas = ()=>{
    return areaSchema.find({})
}
export const deleteAreaById=(id: string)=>{
    return areaSchema.findByIdAndDelete(id)
}
export const createArea = (area: Area)=>{
    return areaSchema.create(area)
}
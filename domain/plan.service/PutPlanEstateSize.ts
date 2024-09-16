import PlanModel from "../Plan.model.ts"
import { IPlanEstateSize, } from "../../entities/plan"
export default class PutEstateSizeService {
    planModel: PlanModel = null as any
    constructor(model: PlanModel) {
        this.planModel = model
    }
    async mergeEstateSize(uid: string, data: IPlanEstateSize) {
        const estateSize: IPlanEstateSize = {
            doubleBedRoom: data.doubleBedRoom || 0,
            singleBedRoom: data.singleBedRoom || 0,
            livingRoom: data.livingRoom || 0,
            bathroom: data.bathroom || 0,
            publicRatio: data.publicRatio || 0,
            balcany: data.balcany || 0,
            parkingSpace: data.parkingSpace || 0,
            floorSize: data.floorSize || 0,
        }
        this.planModel.mergeEstateSize(uid, estateSize)
    }
}
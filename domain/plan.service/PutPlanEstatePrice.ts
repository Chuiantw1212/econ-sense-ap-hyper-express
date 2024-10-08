import PlanModel from "../Plan.model.js"
import { IPlanEstatePrice, } from "../../entities/plan.js"
export default class PutEstatePriceService {
    planModel: PlanModel = null as any
    constructor(model: PlanModel) {
        this.planModel = model
    }
    async mergeEstatePrice(uid: string, data: IPlanEstatePrice) {
        const estatePrice: IPlanEstatePrice = {
            county: data.county || '',
            town: data.town || '',
            buildingType: data.buildingType || '',
            buildingAge: data.buildingAge || '',
            hasParking: data.hasParking || '',
            unitPrice: data.unitPrice || 0,
        }
        this.planModel.mergeObject(uid, {
            estatePrice
        })
    }
}
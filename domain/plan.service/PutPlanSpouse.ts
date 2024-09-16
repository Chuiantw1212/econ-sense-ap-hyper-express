import PlanModel from "../Plan.model"
import { IPlanSpouse } from "../../entities/plan"
export default class PutProfileService {
    planModel: PlanModel = null as any
    constructor(model: PlanModel) {
        this.planModel = model
    }
    async mergeSpouse(uid: string, data: IPlanSpouse) {
        const spouse: IPlanSpouse = {
            yearOfBirth: data.yearOfBirth || '',
            yearOfMarriage: data.yearOfMarriage || '',
            marriageLength: data.marriageLength || 0,
            weddingExpense: data.weddingExpense || 0,
            monthlyNetPay: data.monthlyNetPay || 0,
            monthlyExpense: data.monthlyExpense || 0,
        }
        this.planModel.mergeSpouse(uid, spouse)
    }
}
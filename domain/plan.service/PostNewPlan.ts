import PlanModel from "../Plan.model.js"
import { IPlanDoc } from "../../entities/plan.js"
export default class PostNewPlanService {
    planModel: PlanModel = null as any
    constructor(model: PlanModel) {
        this.planModel = model
    }
    async addNewPlan(uid: string, data: IPlanDoc) {
        const plan = await this.planModel.addNewPlan(uid, data)
        return plan
    }
}
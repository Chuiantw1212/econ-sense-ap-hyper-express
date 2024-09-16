import PlanModel from "../Plan.model"
import { IPlanMortgage } from "../../entities/plan"
export default class PutMortgageService {
    planModel: PlanModel = null as any
    constructor(model: PlanModel) {
        this.planModel = model
    }
    async mergeMortgage(uid: string, data: IPlanMortgage) {
        const estate: IPlanMortgage = {
            downpayYear: data.downpayYear || 0,
            downpayPercent: data.downpayPercent || 0,
            interestRate: data.interestRate || 0,
            loanTerm: data.loanTerm || 0,
            totalPrice: data.totalPrice || 0,
            totalPriceEstimated: data.totalPriceEstimated || 0,
            downpay: data.downpay || 0,
            downpayGoal: data.downpayGoal || 0,
        }
        this.planModel.mergeMortgage(uid, estate)
    }
}
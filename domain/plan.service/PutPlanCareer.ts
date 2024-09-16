import PlanModel from "../Plan.model.tsa"
import { IPlanCareer } from "../../entities/plan"
export default class PutCareerService {
    planModel: PlanModel = null as any
    constructor(model: PlanModel) {
        this.planModel = model
    }
    async mergeCareer(uid: string, data: IPlanCareer) {
        const career: IPlanCareer = {
            // 勞保
            headCount: data.headCount || 0,
            insuredUnit: data.insuredUnit || '',
            // 公保
            payPoint: data.payPoint || 0,
            supervisorRank: data.supervisorRank || '',
            professionalRank: data.professionalRank || '',
            regionalAllowance: data.regionalAllowance || 0,
            // 共同
            monthlyBasicSalary: data.monthlyBasicSalary || 0,
            pension: {
                rate: data.pension.rate || 0,
                monthlyContributionSelf: data.pension.monthlyContributionSelf || 0
            },
            monthlyNetPay: data.monthlyNetPay || 0,
            monthlyExpense: data.monthlyExpense || 0
        }
        this.planModel.mergeCareer(uid, career)
    }
}
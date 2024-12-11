import PlanModel from "../Plan.model.js"
import { IPlanRetirement } from "../../entities/plan.js"
export default class PutRetirementService {
    planModel: PlanModel = null as any
    constructor(model: PlanModel) {
        this.planModel = model
    }
    async mergeRetirement(uid: string, data: IPlanRetirement) {
        const retirement: IPlanRetirement = {
            age: data.age || 0,
            insurance: {
                presentSeniority: data.insurance.presentSeniority || 0,
            },
            pension: {
                employerContribution: data.pension.employerContribution || 0,
                employerContributionIncome: data.pension.employerContributionIncome || 0,
                employeeContrubution: data.pension.employeeContrubution || 0,
                employeeContrubutionIncome: data.pension.employeeContrubutionIncome || 0,
                irrOverDecade: data.pension.irrOverDecade || 0,
                requestType: data.pension.requestType || '',
            },
            monthlyLivingExpense: data.monthlyLivingExpense || 0,
            disability: {
                age: data.disability.age || 0,
                monthlyLivingExpense: data.disability.monthlyLivingExpense || 0,
                monthlyCaringExpense: data.disability.monthlyCaringExpense || 0,
                housing: data.disability.housing || '',
                carer: data.disability.carer || '',
            }
        }
        this.planModel.mergeObject(uid, {
            retirement
        })
    }
}
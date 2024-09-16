import PlanModel from "../Plan.model"
import { IPlanRetirement } from "../../entities/plan"
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
                requestType: data.pension.requestType || ''
            },
            qualityLevel: data.qualityLevel,
            percentileRank: data.percentileRank,
        }
        this.planModel.mergeDocField(uid, 'retirement', retirement)
    }
}
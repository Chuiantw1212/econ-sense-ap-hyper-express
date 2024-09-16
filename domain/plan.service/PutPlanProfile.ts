import PlanModel from "../Plan.model"
import { IPlanProfile } from "../../entities/plan"
export default class PutProfileService {
    planModel: PlanModel = null as any
    constructor(model: PlanModel) {
        this.planModel = model
    }
    async mergeProfile(uid: string, data: IPlanProfile) {
        const profile: IPlanProfile = {
            gender: data.gender || '',
            yearOfBirth: data.yearOfBirth || '',
            careerInsuranceType: data.careerInsuranceType || '',
            yearOfMarriage: data.yearOfMarriage || '',
            story: data.story || '',
        }
        this.planModel.mergeDocField(uid, 'profile', profile)
    }
}
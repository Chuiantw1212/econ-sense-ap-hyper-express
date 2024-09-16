import PlanEntity from '../../entities/plan'
import type { IOptionsItem, } from '../../entities/select'

export interface GetPlanInterfaceUseCase {
    getPlanInterface: () => PlanEntity
}

export interface GetOptionsUseCase {
    getOptions: () => Promise<IOptionsItem[]>
}
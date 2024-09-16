import PlanEntity from '../../entities/plan'
import type { ISelectMap } from '../../entities/select'

export interface GetPlanInterfaceUseCase {
    getPlanInterface: () => PlanEntity
}

export interface GetOptionsUseCase {
    getOptions: () => Promise<ISelectMap>
}
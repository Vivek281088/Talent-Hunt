import { createReducer, on } from "@ngrx/store";
import { Schedule, ScheduleActions } from "./schedule.action";

export interface ScheduleState {
    schedule : Schedule[],
    error : string
}

const initialState : ScheduleState = {
    schedule : [],
    error : ""
}

export const scheduleReducer = createReducer(
    initialState,
    on(ScheduleActions.scheduleSuccess,(state,action)=>{
        return {
            ...state, 
            schedule:action.schedule,
            error : ''
        }
    }),
    on(ScheduleActions.scheduleFailure, (state,action)=>{
        return{
            ...state,
            error:action.error,
            schedule : []
        }
    })
)

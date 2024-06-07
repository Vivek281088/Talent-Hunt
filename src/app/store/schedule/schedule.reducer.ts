import { createReducer, on } from "@ngrx/store";
import { Schedule, ScheduleActions } from "./schedule.action";

export interface ScheduleState {
    schedules : Schedule[],
    error : string,
    scheduleCount : number
}

const initialState : ScheduleState = {
    schedules: [],
    error: "",
    scheduleCount: 0
}

export const getScheduleReducer = createReducer(
    initialState,
    on(ScheduleActions.getScheduleSuccess,(state,action) => {
        console.log(state , action);
        return {
            ...state,
            schedules : action.schedules,
            scheduleCount : action.schedules.length,
            error : ""
        }
    }),
    on(ScheduleActions.getScheduleFailure , (state,action)=> {
        return {
            ...state,
            schedules : [],
            scheduleCount : 0,
            error : action.error
        }
    }),
    on(ScheduleActions.deleteScheduleSuccess, (state,action) => {
        return {
            ...state,
            schedules : state.schedules.filter(schedule => ! action.scheduleIds.includes(schedule.id)),
            scheduleCount : state.scheduleCount - action.scheduleIds.length
        }
    }),
    on(ScheduleActions.deleteScheduleFailure, (state,action) => {
        return {
            ...state,
            error : action.error
        }
    }),
    on(ScheduleActions.updateScheduleSuccess, (state,{schedule})=> {
        return {
            ...state,
            schedules : [...state.schedules , schedule],
            scheduleCount : state.scheduleCount + 1,
            error : ""
        }
    }),
    on(ScheduleActions.updateScheduleFailure,(state , action) => {
        return {
            ...state,
            error : action.error
        }
    })
);

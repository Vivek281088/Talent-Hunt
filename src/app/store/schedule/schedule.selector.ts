import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { ScheduleState, getScheduleReducer } from "./schedule.reducer";

const scheduleFeatureKey = "schedule";
export const selectScheduleState = createFeatureSelector<ScheduleState>(scheduleFeatureKey);
export const ScheduleFeature = createFeature({
    name : scheduleFeatureKey,
    reducer : getScheduleReducer
})

export const getSchedules = createSelector(
    selectScheduleState,
    (state) => state.schedules
)

export const getScheduleError = createSelector(
    selectScheduleState,
    (state) => state.error
)

export const addSchedule = createSelector(
    selectScheduleState,
    (state) => state.schedules
)
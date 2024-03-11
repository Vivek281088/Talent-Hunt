import { createFeatureSelector, createSelector } from "@ngrx/store"
import { ScheduleState } from "./schedule.reducer"


export const selectScheduleKey = 'schedule'
export const selectScheduleFeatureKey = createFeatureSelector<ScheduleState>(selectScheduleKey)

export const getScheduleData = createSelector(
    selectScheduleFeatureKey,
    (state) => state.schedule
)

export const getScheduleError = createSelector(
    selectScheduleFeatureKey,
    (state) => state.error
)
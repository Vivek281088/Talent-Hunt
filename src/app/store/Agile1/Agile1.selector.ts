import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { agileReducer, agileState } from "./Agile1.reducer";

const agileFeatureKey = "agile";
export const State = createFeatureSelector<agileState>(agileFeatureKey);
export const agileFeature = createFeature({
    name : agileFeatureKey,
    reducer : agileReducer
});

export const getAgile = createSelector(
  State,
    (state) => state.agileDetails
)

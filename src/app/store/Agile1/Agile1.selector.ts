import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { agileReducer, agileState } from "./Agile1.reducer";

const agileFeatureKey = "agile";
export const agileFeatureState = createFeatureSelector<agileState>(agileFeatureKey);
export const pcrFeature = createFeature({
    name : agileFeatureKey,
    reducer : agileReducer
});

export const getAgile = createSelector(
    agileFeatureState,
    (state) => state.agileDetails
)

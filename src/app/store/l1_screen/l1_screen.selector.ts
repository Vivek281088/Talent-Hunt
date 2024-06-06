import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { l1Reducer, l1State } from "./l1_screen.reducer";

const l1FeatureKey = "l1";
export const State = createFeatureSelector<l1State>(l1FeatureKey);
export const pcrFeature = createFeature({
    name : l1FeatureKey,
    reducer : l1Reducer
});

export const getL1 = createSelector(
  State,
    (state) => state.l1Details
)

import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { pcrReducer, pcrState } from "./pcr.reducer";

const pcrFeatureKey = "pcr";
export const PCRState = createFeatureSelector<pcrState>(pcrFeatureKey);
export const pcrFeature = createFeature({
    name : pcrFeatureKey,
    reducer : pcrReducer
});

export const getPcr = createSelector(
  PCRState,
    (state) => state.pcr
)
export const checkPcrAddStaus = createSelector(
  PCRState,
  (state) => state.newPcrAdded
)


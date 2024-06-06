import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { CandidateState, candidateReducer } from "./resource.reducer";

const resourceFeatureKey = "candidates";
export const resourceState = createFeatureSelector<CandidateState>(resourceFeatureKey);
export const ResourceFeature = createFeature({
    name : resourceFeatureKey,
    reducer : candidateReducer
});

export const getResource = createSelector(
    resourceState,
    (state) => state.candidates
)
export const getResourceError = createSelector(
    resourceState,
    (state) => state.error
)
export const checkResourceAddStaus = createSelector(
    resourceState,
    (state) => state.newUserAdded
)
export const checkResourceDeleteStaus = createSelector(
    resourceState,
    (state) => state.candidateDeleted
)
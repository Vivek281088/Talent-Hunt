import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { CandidateState, candidateReducer } from "./candidate.reducer";

const candidateFeatureKey = "candidate";
export const candidateState = createFeatureSelector<CandidateState>(candidateFeatureKey);
export const CandidateFeature = createFeature({
    name : candidateFeatureKey,
    reducer : candidateReducer
});

export const getCandidate = createSelector(
    candidateState,
    (state) => state.candidates
)
export const getCandidateError = createSelector(
    candidateState,
    (state) => state.error
)
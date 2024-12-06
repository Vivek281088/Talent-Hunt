import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { MappingPcrCandidateState, MappingState,getMappingDataReducer,MapPcrCandidateReducer } from "./pcr-mapping.reducer";


const mappingFeatureKey = "mappingData";
const postMapFeatureKey = "mappingPcrCandidateData"


export const mappingState = createFeatureSelector<MappingState>(mappingFeatureKey);
export const mappingFeature = createFeature({
  name : mappingFeatureKey,
  reducer : getMappingDataReducer
})
export const getMappingData = createSelector(
  mappingState,
  (state)=> state.mappingData
)

export const mappingPcrCandidateState = createFeatureSelector<MappingPcrCandidateState>(postMapFeatureKey);
export const mappingPcrCandidateFeature = createFeature({
  name : postMapFeatureKey,
  reducer : MapPcrCandidateReducer
})


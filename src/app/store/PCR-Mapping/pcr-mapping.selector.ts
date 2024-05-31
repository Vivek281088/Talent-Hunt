import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { MappingState,getMappingDataReducer } from "./pcr-mapping.reducer";


const mappingFeatureKey = "mappingData";

export const mappingState = createFeatureSelector<MappingState>(mappingFeatureKey);
export const mappingFeature = createFeature({
  name : mappingFeatureKey,
  reducer : getMappingDataReducer
})
export const getMappingData = createSelector(
  mappingState,
  (state)=> state.mappingData
)

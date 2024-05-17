
import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { ManagerState, getManagerDataReducer } from "./manage-manager.reducer";


const managerFeatureKey = "managerData";

export const selectManagerState = createFeatureSelector<ManagerState>(managerFeatureKey);
export const managerFeature = createFeature({
  name : managerFeatureKey,
  reducer : getManagerDataReducer
})
export const getManagerData = createSelector(
  selectManagerState,
  (state)=> state.managerData
)

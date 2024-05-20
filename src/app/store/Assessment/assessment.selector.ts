import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { AssessmentState, getAssessmentReducer } from "./assessment.reducer";

const assessmentFeatureKey="Assessment";
export const SelectAssessmentState=createFeatureSelector<AssessmentState>(assessmentFeatureKey);
export const assessmentFeature=createFeature({
  name: assessmentFeatureKey,
  reducer: getAssessmentReducer
})
export const getAssessment=createSelector(
  SelectAssessmentState,
  (state)=>state.assessment
)




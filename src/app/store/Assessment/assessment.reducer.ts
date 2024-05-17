import { createReducer, on } from '@ngrx/store';
import { AssessmentActions, Assessment } from './assessment.action';

export interface AssessmentState{
assessment:Assessment[],
error:string,
assessmentCount:number
}

const initialState:AssessmentState ={
  assessment:[],
  error:"",
  assessmentCount:0

}

export const getAssessmentReducer= createReducer(
  initialState,
on(AssessmentActions.getAssessmentSuccess,(state,action)=>{
console.log(state,action);
return{
  ...state,
  assessment:action.assessment,
  assessmentCount:action.assessment.length,
  error:""

}
}),
on(AssessmentActions.getAssessmentFailure , (state,action)=> {
  return {
      ...state,
      assessment: [],
      assessmentCount : 0,
      error : action.error
  }
})
);

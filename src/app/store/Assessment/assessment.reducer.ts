import { createReducer, on } from '@ngrx/store';
import { AssessmentActions, Assessment } from './assessment.action';

export interface AssessmentState{
assessments:Assessment[],
error:string,
assessmentCount:number
}

const initialState:AssessmentState ={
  assessments:[],
  error:"",
  assessmentCount:0

}

export const getAssessmentReducer= createReducer(
  initialState,
on(AssessmentActions.getAssessmentSuccess,(state,action)=>{
console.log(state,action);
return{
  ...state,
  assessments:action.assessment,
  assessmentCount:action.assessment.length,
  error:""

}
}),
on(AssessmentActions.getAssessmentFailure , (state,action)=> {
  return {
      ...state,
      assessments: [],
      assessmentCount : 0,
      error : action.error
  }
}),

on(AssessmentActions.sendAssessmentSuccess, (state,action)=> {
  console.log("state inside",state)
  console.log("action inside ..........." , action)
  return {
      ...state,
      assessments : [...state.assessments , action.assessment],
      assessmentCount : state.assessmentCount + 1,
      error : ""
  }
}),
on(AssessmentActions.sendAssessmentFailure,(state , action) => {
  return {
      ...state,
      error : action.error
  }
})

);

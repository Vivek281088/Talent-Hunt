import { createReducer, on } from "@ngrx/store";
import { Candidate, candidateActions, } from "./candidate.action";

export interface CandidateState{
    candidates : Candidate[],
    error : string,
    candidateCount : number
}

export const initialState : CandidateState = {
    candidates: [],
    error: "",
    candidateCount: 0
}

export const candidateReducer = createReducer(
    initialState,
    on(candidateActions.getCandidateSuccess, (state,action) =>{
        console.log("actionssss" , action)
        return {
            ...state,
            candidates : action.candidates,
            error:"",
            candidateCount : action.candidates.length
        }
    }),
    on(candidateActions.getCandidateFailure, (state,action) =>{
        return {
            ...state,
            candidates : [],
            error:action.error,
            candidateCount : 0
        }
    }),
    on(candidateActions.updateCandidateSuccess , (state,action) => {
        return{
            ...state,
            candidates : state.candidates.map(candidate => candidate.empid == action.candidate.empid ? {...candidate , ...action.candidate} : candidate)
        }
    }),
    on(candidateActions.getCandidateFailure , (state,action)=>{
        return {
            ...state,
            candidates : state.candidates,
            candidateCount : state.candidateCount,
            error : state.error
        }
    })
)
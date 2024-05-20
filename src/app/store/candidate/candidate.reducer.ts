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
            candidates : state.candidates.map(candidate => candidate.empid == action.candidate.empid ? {...candidate , ...((({id,...rest})=> rest)(action.candidate))} : candidate)
        }
    }),
    on(candidateActions.getCandidateFailure , (state,action)=>{
        return {
            ...state,
            candidates : state.candidates,
            candidateCount : state.candidateCount,
            error : action.error
        }
    }),
    on(candidateActions.addCandidateSuccess, (state,action) => {
        console.log("candidate action" , action)
        return {
            ...state,
            candidates : [...state.candidates , action.candidate],
            candidateCount : state.candidateCount + 1
        }
    }),
    on(candidateActions.addCandidateFailure, (state,action) => {
        return {
            ...state,
            error : action.error
        }
    }),
    on(candidateActions.clearCandidateError , (state , action)=>{
        return {
            ...state,
            error: ""
        }
    })
)
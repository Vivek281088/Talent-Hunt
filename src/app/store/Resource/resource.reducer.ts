import { createReducer, on } from "@ngrx/store";
import { Candidate, candidateActions, } from "./resource.action";

export interface CandidateState{
    candidates : Candidate[],
    error : string,
    candidateCount : number,
    newUserAdded : boolean,
    candidateDeleted : boolean
}

export const initialState : CandidateState = {
    candidates: [],
    error: "",
    candidateCount: 0,
    newUserAdded : false,
    candidateDeleted : false
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
            candidateCount : state.candidateCount + 1,
            newUserAdded : true
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
    }),
    on(candidateActions.clearNewcandidate,(state,action)=> {
        return {
            ...state,
            newUserAdded : false
        }
    }),
    on(candidateActions.clearDeleteCamdidateStatus,(state,action)=> {
        return {
            ...state,
            candidateDeleted : false
        }
    }),
    
    on(candidateActions.deleteCandidateFailure,(state,action)=> {
        return {
            ...state,
            error : action.error
        }
    })
)

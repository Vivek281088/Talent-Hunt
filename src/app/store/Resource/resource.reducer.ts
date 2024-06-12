import { createReducer, on } from "@ngrx/store";
import { Candidates, resourceActions } from "./resource.action";

export interface CandidateState{
    candidates : Candidates[],
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
    on(resourceActions.getResourceSuccess, (state,action) =>{
        console.log("actionssss" , action)
        return {
            ...state,
            candidates : action.candidates,
            error:"",
            candidateCount : action.candidates.length
        }
    }),
    on(resourceActions.getResourceFailure, (state,action) =>{
        return {
            ...state,
            candidates : [],
            error:action.error,
            candidateCount : 0
        }
    }),
    on(resourceActions.addResourceSuccess, (state,action) => {
        console.log("candidate action" , action)
        return {
            ...state,
            candidates : [...state.candidates , action.candidate],
            candidateCount : state.candidateCount + 1,
            newUserAdded : true
        }
    }),
    on(resourceActions.addResourceFailure, (state,action) => {
        return {
            ...state,
            error : action.error
        }
    }),
    // on(candidateActions.clearCandidateError , (state , action)=>{
    //     return {
    //         ...state,
    //         error: ""
    //     }
    // }),
    // on(candidateActions.clearNewcandidate,(state,action)=> {
    //     return {
    //         ...state,
    //         newUserAdded : false
    //     }
    // }),
    // on(candidateActions.clearDeleteCamdidateStatus,(state,action)=> {
    //     return {
    //         ...state,
    //         candidateDeleted : false
    //     }
    // }),
    // on(candidateActions.deleteCandidateSuccess,(state,action) => {
    //     const deleteSet = new Set(action.candidates.map(can => can.id));
    //     return {
    //         ...state,
    //         candidates : state.candidates.filter(candidate => !deleteSet.has(candidate.id)),
    //         candidateDeleted : true
    //     }
    // }),
    // on(candidateActions.deleteCandidateFailure,(state,action)=> {
    //     return {
    //         ...state,
    //         error : action.error
    //     }
    // })

    on(resourceActions.deleteResourceSuccess, (state,action) => {
      console.log('Actions', action.candidateId, state.candidates)
      return {
          ...state,
          candidates : state.candidates.filter(candidate => !action.candidateId.includes(candidate.candidateId)),
          candidateDeleted : true
      }
    }),
    on(resourceActions.deleteResourceFailure, (state,action) => {
      return {
          ...state,
          error : action.error
      }
    }),
)

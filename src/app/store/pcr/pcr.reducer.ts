import { createReducer, on } from "@ngrx/store"
import { PCR, PcrActions } from "./pcr.action"

export interface pcrState{
  newPcrAdded: boolean
  pcr : PCR[],
  error : string,
  pcrCount:number
}

export const initialState : pcrState = {
  pcr: [],
  error: "",
  pcrCount: 0,
  newPcrAdded: false
}

export const pcrReducer = createReducer(
  initialState,
  on(PcrActions.getPCRSuccess, (state,action) =>{
      console.log("actionssss" , action)
      return {
          ...state,
          pcr : action.pcr,
          error:"",
          pcrCount : action.pcr.length
      }
  }),
  on(PcrActions.getPCRFailure, (state,action) =>{
      return {
          ...state,
          pcr : [],
          error:action.error,
          pcrCount : 0
      }
  }),
  on(PcrActions.addPCRSuccess, (state,action) => {
    console.log("candidate action" , action)
    return {
        ...state,
        pcr : [...state.pcr , action.pcr],
        pcrCount : state.pcrCount + 1,
        newPcrAdded : true
    }
}),
on(PcrActions.addPCRFailure, (state,action) => {
    return {
        ...state,
        error : action.error
    }
}),
)

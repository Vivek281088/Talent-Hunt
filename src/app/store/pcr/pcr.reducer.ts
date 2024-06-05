import { createReducer, on } from "@ngrx/store"
import { PCR, PcrActions } from "./pcr.action"

export interface pcrState{
  pcr : PCR[],
  error : string,
  pcrCount:number
}

export const initialState : pcrState = {
  pcr: [],
  error: "",
  pcrCount: 0,
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
)

import { createReducer, on } from "@ngrx/store";
import { l1Actions, l1Details } from "./l1_screen.action";

export interface l1State{
  l1Details : l1Details[],
  error : string,
  l1DetailsCount:number
}

export const initialState : l1State = {
  l1Details: [],
  error: "",
  l1DetailsCount: 0,
}

export const l1Reducer = createReducer(
  initialState,
  on(l1Actions.getL1DetailsSuccess, (state,action) =>{
      console.log("actionssss" , action)
      return {
          ...state,
          l1Details : action.l1Details,
          error:"",
          l1DetailsCount : action.l1Details.length
      }
  }),
  on(l1Actions.getL1DetailsFailure, (state,action) =>{
      return {
          ...state,
          l1Details : [],
          error:action.error,
          l1DetailsCount : 0
      }
  }),
)

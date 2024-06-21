


import { createReducer, on } from "@ngrx/store";
import { agileActions, agileDetails } from "./Agile1.action";

export interface agileState{

  agileDetails:agileDetails[];
  error:string,
  agileDetailsCount:number;
}

export const initialState : agileState={
  agileDetails:[],
  error:"",
  agileDetailsCount:0


}

export const agileReducer = createReducer(
  initialState,
  on(agileActions.getAgileDetailsSuccess, (state,action) =>{
      console.log("actionssss" , action)
      return {
          ...state,
          agileDetails : action.agileDetails,
          error:"",
          agileDetailsCount : action.agileDetails.length
      }
  }),
  on(agileActions.getAgileDetailsFailure, (state,action) =>{
      return {
          ...state,
          agileDetails : [],
          error:action.error,
          agileDetailsCount : 0
      }
  })
);

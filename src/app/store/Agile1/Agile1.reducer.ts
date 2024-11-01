


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
  on(agileActions.getAgileSuccess, (state,action) =>{
      console.log("actionssss" , action)
      return {
          ...state,
          agileDetails : action.agile,
          error:"",
          agileDetailsCount : action.agile.length
      }
  }),
  on(agileActions.getAgileFailure, (state,action) =>{
      return {
          ...state,
          agileDetails : [],
          error:action.error,
          agileDetailsCount : 0
      }
  })
);

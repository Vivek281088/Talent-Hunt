import { createReducer, on } from "@ngrx/store";
import { Manager, managerActions } from "./manager.action";
import { initialState } from "../candidate/candidate.reducer";

export interface managerState{
    managers:Manager[],
    error:string,
    managerCount:number

}

const initialManagerState: managerState={
    managers:[],
    error:'',
    managerCount:0

}

export const getManagerData=createReducer(
    initialManagerState,
    on(managerActions.getManagerSuccess,(state,action)=>{
        console.log(state,action);
        return {
            ...state,
            managers:action.Manager,
            error:"",
            managerCount:action.Manager.length
        }
    }),
    on(managerActions.getManagerFailure,(state,action)=>{
        return{
            ...state,
            managers:[],
            error:action.error,
            managerCount:0
        }
    })

)
import { createReducer, on } from "@ngrx/store";
import { Invite, inviteaction } from "./invite.action";

export interface invitecandidate{
    invite:Invite[],
    error:string,
    count:number
}

export const initialstate:invitecandidate={
    invite:[],
    error:"",
    count:0
}

export const Invitecandidate=createReducer(
    initialstate,
    on(inviteaction.postInviteSuccess, (state,action) =>
        {
        console.log("actions",action)
        return {
        ...state,
        invite:[...state.invite,action.assessment],
        errror:"",
        count:state.invite.length
        }
        
    }),
    on(inviteaction.postInviteFailure,(state,action)=>{
        return{
            ...state,
            invite:[],
            error:action.error,
            count:0
        }

    })

)
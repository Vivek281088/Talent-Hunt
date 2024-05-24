import { inject } from "@angular/core";
import { createEffect, ofType } from "@ngrx/effects";
// import { TableService } from "primeng/table";
import { TableService } from "src/app/services/table.service";
// import { Actions } from "rxjs/internal/scheduler/Action";
import { Actions } from "@ngrx/effects";
import { inviteaction } from "./invite.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { error } from "console";

export const inviteffect$=createEffect(
    (actions$=inject(Actions), inviteservice=inject(TableService))=>{
    return actions$.pipe(
        ofType(inviteaction.postInvite),
        exhaustMap((assess)=>
            inviteservice.postInviteCandidate(assess.assessment).pipe(
                tap((invite)=>console.log(invite)),
                map((assessment)=>inviteaction.postInviteSuccess({assessment})),
                catchError((error:{message:string})=>
                    of(inviteaction.postInviteFailure({error:error.message}))
                )
            )
        )
    )
    

},{functional:true})
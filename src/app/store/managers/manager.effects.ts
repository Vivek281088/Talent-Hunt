import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ManagernameService } from "src/app/services/managername.service";
import { managerActions } from "./manager.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { error } from "console";

export const loadmaangerdata$=createEffect(
   (actions$=inject(Actions), managerService=inject(ManagernameService))=>{

    return actions$.pipe
    (
        ofType(managerActions.getManager),
        exhaustMap
        (
            ()=>
            managerService.getclientManagerData().pipe
        (
                tap((data)=>console.log("data from service",data)),
                map((Manager)=>managerActions.getManagerSuccess({Manager})),
                catchError((error:{message:string})=>
                    of(managerActions.getManagerFailure({error:error.message}))
                
            )
        )))
        },{functional:true}
    );
    
    
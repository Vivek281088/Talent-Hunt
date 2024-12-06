import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PcrService } from "src/app/services/pcr.service";
import { agileActions } from "./Agile1.action";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { response } from "express";

export const getAgile$=createEffect(
  (action$ = inject(Actions) , agileService = inject(PcrService)) => {
    return action$.pipe(
        ofType(agileActions.getAgile),
        exhaustMap(()=>
          agileService.getAgile().pipe(
                tap((agile) => console.log(agile)),
                map((agile) => agileActions.getAgileSuccess({agile})),
                catchError((error : {message : string}) =>
                    of(agileActions.getAgileFailure({error : error.message}))
                )
            )
        )
    )
},
{functional:true}
)

export const addpcr$=createEffect(
    (action$=inject(Actions),addPCRService=inject(PcrService))=>{
        return action$.pipe(
            ofType(agileActions.addAgile),

            switchMap((agile) =>
                addPCRService.addAgile1Details(agile.agile).pipe(
                    tap((agile) =>{
                        console.log("add agile.................." , agile);
                    }),
                    map((agile) => agileActions.addAgileSuccess({agile})),
                    catchError((error) => {
                        console.log(error)
                        return of(agileActions.addAgileFailure({error : error.error}))
                    } )
                )
            )
        )





    }
,{functional:true}
  )
 
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PcrService } from "src/app/services/pcr.service";
import { agileActions } from "./Agile1.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";

export const agileDetails$=createEffect(
  (action$ = inject(Actions) , agileService = inject(PcrService)) => {
    return action$.pipe(
        ofType(agileActions.getAgileDetails),
        exhaustMap(()=>
          agileService.getAgile().pipe(
                tap((agile) => console.log(agile)),
                map((agileDetails) => agileActions.getAgileDetailsSuccess({agileDetails})),
                catchError((error : {message : string}) =>
                    of(agileActions.getAgileDetailsFailure({error : error.message}))
                )
            )
        )
    )
},
{functional:true}
)

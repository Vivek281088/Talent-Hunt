
import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { PcrActions } from "./pcr.action"
import { catchError, exhaustMap, map, of, tap } from "rxjs"
import { NewScheduleService } from "src/app/services/new-schedule.service"

export const getPcr$ = createEffect(
  (action$ = inject(Actions) , pcrService = inject(NewScheduleService)) => {
      return action$.pipe(
          ofType(PcrActions.getPCR),
          exhaustMap(()=>
            pcrService.getPcr().pipe(
                  tap((PCR) => console.log(PCR)),
                  map((pcr) => PcrActions.getPCRSuccess({pcr})),
                  catchError((error : {message : string}) =>
                      of(PcrActions.getPCRFailure({error : error.message}))
                  )
              )
          )
      )
  },
  {functional:true}
  )

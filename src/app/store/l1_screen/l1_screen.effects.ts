import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { L1ScreenService } from "src/app/services/l1-screen.service"
import { l1Actions } from "./l1_screen.action"
import { catchError, exhaustMap, map, of, tap } from "rxjs"

export const getl1Details$ = createEffect(
  (action$ = inject(Actions) , l1Service = inject(L1ScreenService)) => {
      return action$.pipe(
          ofType(l1Actions.getL1Details),
          exhaustMap(()=>
            l1Service.getl1Details().pipe(
                  tap((details) => console.log(details)),
                  map((l1Details) => l1Actions.getL1DetailsSuccess({l1Details})),
                  catchError((error : {message : string}) =>
                      of(l1Actions.getL1DetailsFailure({error : error.message}))
                  )
              )
          )
      )
  },
  {functional:true}
  )

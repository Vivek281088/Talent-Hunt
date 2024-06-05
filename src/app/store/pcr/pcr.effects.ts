
import { Injectable, inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { PcrActions } from "./pcr.action"
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs"
import { PcrService } from "src/app/services/pcr.service"
import { error } from "console"

export const getPcr$ = createEffect(
  (action$ = inject(Actions) , pcrService = inject(PcrService)) => {
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

  export const addpcr$=createEffect(
    (action$=inject(Actions),addPCRService=inject(PcrService))=>{
        return action$.pipe(
            ofType(PcrActions.addPCR),
           
            switchMap((pcr) => 
                addPCRService.addpcr(pcr.pcr).pipe(
                    tap((pcr) =>{
                        console.log("add pcr.................." , pcr);
                    }),
                    map((pcr) => PcrActions.addPCRSuccess({pcr})),
                    catchError((error) => {
                        console.log(error)
                        return of(PcrActions.addPCRFailure({error : error.error}))
                    } )
                )
            )
        )
        
        

    }
,{functional:true}
  )

// export const updatePcr$= createEffect(
//     (action$=inject(Actions) , updatePCRService=inject(PcrService)) => {
//         return action$.pipe(
//             ofType(PcrActions.updatePCR),
//             exhaustMap(pcr) => 
            // exhaustMap(pcr) =>
            //     updatePCRService.updatepcr(pcr.pcr).pipe(
            //         tap(pcr =>console.log(pcr)),
            //         map((pcr)=>PcrActions.updatePCRSuccess({pcr})),
            //         catchError((error:{message:string})=>
            //         of(PcrActions.updatePCRFailure({error:error.message})))

            //     )
//         )
//     }
//     ,{functional:true}
// )
export const updatePcr$ = createEffect(
    (actions$ = inject(Actions) , updatePCRservice = inject(PcrService)) => {
        return actions$.pipe(
            ofType(PcrActions.updatePCR),
            exhaustMap((pcr) => updatePCRservice.updatepcr(pcr.pcr).pipe(
                tap(pcr=>console.log("pcr data",pcr)),
                map((pcr)=>PcrActions.updatePCRSuccess({pcr})),
                catchError((error:{message:string})=>
                of(PcrActions.updatePCRFailure({error:error.message})))

            ) )
        )
    },
    {functional:true}
)
@Injectable()
export class pcrEffects{
    constructor(private actions$ : Actions, private pcrService : PcrService){}

    getpcrDetails$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(PcrActions.getPCR),
            exhaustMap((pcr)=> 
                this.pcrService.getPcr().pipe(
                    tap((pcr) => console.log(pcr)),
                    map((pcr) => PcrActions.getPCRSuccess({pcr})),
                    catchError((error) => of(PcrActions.getPCRFailure({error : error.message})))
                )
            )
        )
    })

    addMultiPCR$ = createEffect(()=> {
        return this.actions$.pipe(
            ofType(PcrActions.addMultiPCR),
            exhaustMap((pcr)=> 
                this.pcrService.addMuiltPCR(pcr.pcr).pipe(
                    tap(pcr => console.log("add multi pcr .........." , pcr)),
                    map((pcr) => PcrActions.addMultiPCRSuccess({pcr})),
                    catchError((error) => of(PcrActions.addMultiPCRFailure({error : error.message})))
                )
            )
        )
    })
}
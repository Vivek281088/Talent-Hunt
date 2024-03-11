import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TableService } from "src/app/services/table.service";
import { ScheduleActions } from "./schedule.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { SkillsdropdownService } from "src/app/services/skillsdropdown.service";


@Injectable()
export class ScheduleEffects {
    constructor(private scheduleService : TableService, private actions$ : Actions, private newScheduleService : SkillsdropdownService){}
    loadScedule$ = createEffect(()=>
         this.actions$.pipe(
            ofType(ScheduleActions.getScheduleData),
            mergeMap((action) =>
            this.scheduleService.getExistingData().pipe(
                map((schedule) => 
                    ScheduleActions.scheduleSuccess({schedule}),
                ),
                catchError((error: { message: string }) =>
                  of(ScheduleActions.scheduleFailure({ error: error.message }))
                )
              )
            )
          
         ));

    addSchedule$ = createEffect( ()=> 
        this.actions$.pipe( 
          ofType(ScheduleActions.addScheduleData),
          mergeMap( (action) => 
            this.newScheduleService.postNewSchedule(action.schedule).pipe(
              
            )
          )
        )
    );
}
import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TableService } from 'src/app/services/table.service';
import { ScheduleActions } from './schedule.action';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';

export const loadSchedule$ = createEffect(
  (actions$ = inject(Actions), scheduleService = inject(TableService)) => {
    return actions$.pipe(
      ofType(ScheduleActions.getSchedule),
      exhaustMap(() =>
        scheduleService.getScheduleData().pipe(
          tap((schedules) => console.log(schedules)),
          map((schedules) => ScheduleActions.getScheduleSuccess({ schedules })),
          catchError((error: { message: string }) =>
            of(ScheduleActions.getScheduleFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const addSchedule$ = createEffect(
  (
    actions$ = inject(Actions),
    scheduleService = inject(SkillsdropdownService)
  ) => {
    return actions$.pipe(
      ofType(ScheduleActions.updateSchedule),
      tap((schedule) => console.log(schedule)),
      exhaustMap((schedule) =>
        scheduleService.postNewSchedule(schedule).pipe(
          tap((schedules) => console.log(schedules)),
          map((schedule) => ScheduleActions.updateScheduleSuccess({ schedule })),
          catchError((error: { message: string }) =>
            of(ScheduleActions.updateScheduleFailure({ error: error.message }))
          )
        )
      )
    );
  },
  {functional:true}
);

export const deleteSchedule$ = createEffect(
  (
    actions$ = inject(Actions),
    scheduleService = inject(TableService)
  ) => {
    return actions$.pipe(
      ofType(ScheduleActions.deleteSchedule),
      tap((scheduleIds) => console.log(scheduleIds)),
      exhaustMap((scheduleIds) =>
        {
        console.log("Schedule Idssssssssssssss" , scheduleIds)
        return scheduleService.deleteSchedules(scheduleIds.scheduleIds).pipe(
          tap((schedules) => console.log(schedules)),
          map((scheduleIds) => ScheduleActions.deleteScheduleSuccess({ scheduleIds:scheduleIds as string[] })),
          catchError((error: { message: string }) =>
            of(ScheduleActions.deleteScheduleFailure({ error: error.message }))
          )
        )
  })
    );
  },
  {functional:true}
);

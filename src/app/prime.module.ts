import { NgModule } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';


@NgModule({
  imports: [
        MultiSelectModule,
        DropdownModule,
        ButtonModule,
        CardModule,
        CheckboxModule,
        TableModule
    ],
    exports: [
        MultiSelectModule,
        DropdownModule,
        ButtonModule,
        CardModule,
        CheckboxModule,
        TableModule
    ]
})
export class PrimeModule { }


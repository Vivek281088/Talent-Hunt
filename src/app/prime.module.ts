import { NgModule } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
        MultiSelectModule,
        DropdownModule,
        ButtonModule
    ],
    exports: [
        MultiSelectModule,
        DropdownModule,
        ButtonModule

    ]
})
export class PrimeModule { }


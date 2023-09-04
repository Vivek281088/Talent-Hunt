import { NgModule } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
        MultiSelectModule,
        DropdownModule,
        ButtonModule,
        CardModule,
        CheckboxModule,
        InputNumberModule,
        InputTextareaModule,
        RadioButtonModule,
        FormsModule,

        
    ],
    exports: [
        MultiSelectModule,
        DropdownModule,
        ButtonModule,
        CardModule,
        CheckboxModule,
        InputNumberModule,
        InputTextareaModule,
        RadioButtonModule,
        FormsModule,

    ]
})
export class PrimeModule { }


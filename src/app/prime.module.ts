import { NgModule } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { FileUploadModule } from 'primeng/fileupload';

import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  imports: [
    MultiSelectModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    TableModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    FormsModule,
    KeyFilterModule,
    OverlayPanelModule,
    TooltipModule,
    DialogModule,
    TabViewModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    FileUploadModule,
    CalendarModule,
    BreadcrumbModule,
    ChipModule,
    TagModule,
    BadgeModule
  ],
  exports: [
    MultiSelectModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    TableModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    FormsModule,
    KeyFilterModule,
    OverlayPanelModule,
    TooltipModule,
    DialogModule,
    TabViewModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    FileUploadModule,
    CalendarModule,
    BreadcrumbModule,
    ChipModule,
    TagModule,
    BadgeModule
  ],
})
export class PrimeModule {}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-enable2fa',
  standalone: true,
  imports: [CommonModule,CardModule,ReactiveFormsModule,DialogModule, ButtonModule],
  templateUrl: './enable2fa.component.html',
  styleUrls: ['./enable2fa.component.scss'],
})
export class Enable2faComponent {

  visible: boolean = false;
  authCode = 'Aishu271200'; 
  clickme(){
    this.visible=true;
  }
  cancelButton() {
    this.visible = false;
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-enable2fa',
  standalone: true,
  imports: [CommonModule,CardModule,ReactiveFormsModule],
  templateUrl: './enable2fa.component.html',
  styleUrls: ['./enable2fa.component.scss']
})
export class Enable2faComponent {

}

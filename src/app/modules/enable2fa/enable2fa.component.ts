import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-enable2fa',
  standalone: true,
  imports: [CommonModule, CardModule, ReactiveFormsModule, DialogModule, ButtonModule],
  templateUrl: './enable2fa.component.html',
  styleUrls: ['./enable2fa.component.scss'],
})
export class Enable2faComponent {

  visible: boolean = false;
  secretCode: string = 'bfhbfh34627865784';
  authCode = 'Aishu271200';
  copyMessage: string = 'Copied!'; 
  showTick: boolean= false;

  constructor(private clipboard: Clipboard) {}

  clickme() {
    this.visible = true;
  }

  cancelButton() {
    this.visible = false;
  }

  // copyToClipboard(text: string) {
  //   this.clipboard.copy(text);
  //   this.copyMessage = 'Copied!'; 
  //   setTimeout(() => {
  //     this.copyMessage = ''; 
  //   }, 1000);
  //   console.log('Copiedd', this.copyMessage)
  // }
  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    this.copyMessage = 'Copied!';
    this.showTick = true; // show tick icon

    setTimeout(() => {
      this.showTick = false; // hide tick icon
      this.copyMessage = ''; // reset copy message
    }, 1000); // 1000 milliseconds or 1 second
  }

}
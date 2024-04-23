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

  twofactvisible: boolean = false;
  secretCode: string = 'bfhbfh34627865784';
  authCode = 'Aishu271200';
  copyMessage: string = 'Copied!'; 
  showTick: boolean= false;

  constructor(private clipboard: Clipboard) {}

  clickme() {
    this.twofactvisible = true;
  }

  cancelButton() {
    this.twofactvisible = false;
  }
  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    this.copyMessage = 'Copied!';
    this.showTick = true; 
    console.log("showTick set to true"); 
        setTimeout(() => {
      this.showTick = false; 
      this.copyMessage = ''; 
      console.log("showTick set to false");
    }, 1500); 
  }

}
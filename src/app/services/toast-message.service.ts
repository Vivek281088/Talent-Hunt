import { Injectable } from '@angular/core';
import {MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor(private messageService : MessageService) { }
  duplicateCandidateError(){
    this.messageService.add({
      severity: 'error',
      summary: 'Candidate Already Present',
      detail: 'Check Employee ID or Email !',
    });
  }

}

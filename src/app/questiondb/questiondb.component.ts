// Import the necessary modules
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-questiondb',
  templateUrl: './questiondb.component.html',
  styleUrls: ['./questiondb.component.scss'],
})
export class QuestiondbComponent {
  skillSet: any[] = [];
  selectedSkill: any[] = [];
  showUpload: boolean = false;
 
  constructor(
    private messageService: MessageService,
    private skillsdropdownservice: SkillsdropdownService,
    private http: HttpClient // Import HttpClient
  ) {}
 
  ngOnInit() {
    this.loadSkillsforDropDown();
  }
 
  submitForm() {}
 
  showFileUpload() {
    this.showUpload = !this.showUpload;
    console.log('hi', this.showUpload);
  }
 
  // Handle the CSV file upload
  onCSVFileUpload(event: any) {
    const file = event.files[0];
 
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
 
      // Adjust the URL to your server endpoint
      this.http.post('/api/upload-csv', formData).subscribe(
        (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'CSV File Uploaded',
            detail: response.message,
          });
          // Handle the response here if needed
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error Uploading CSV File',
            detail: error.error.message,
          });
          // Handle errors here if needed
        }
      );
    }
  }
 
  onFileUpload() {
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
    // Handle the uploaded file here if needed
  }
 
  onFileRemove() {
    this.messageService.add({
      severity: 'warn',
      summary: 'File Removed',
      detail: '',
    });
    // Handle the removed file here if needed
  }
 
  loadSkillsforDropDown() {
    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skillSet = data;
      console.log('Skills---', this.skillSet);
      console.log('data', data);
    });
  }
}
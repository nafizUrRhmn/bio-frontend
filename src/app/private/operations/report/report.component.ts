import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  startDate: Date;
  endDate: Date;

  constructor(private http: HttpClient) { }

  generatePdfReport() {

    if (this.startDate && this.endDate) {

      const startDateYear = this.startDate.getFullYear();
      const startDateMonth = (this.startDate.getMonth() + 1).toString().padStart(2, '0');
      const startDateDay = this.startDate.getDate().toString().padStart(2, '0');

      const startDateString = `${startDateYear}-${startDateMonth}-${startDateDay}`;

      console.log("startDateString" + startDateString);

      const endDateYear = this.endDate.getFullYear();
      const endDateMonth = (this.endDate.getMonth() + 1).toString().padStart(2, '0');
      const endDateDay = this.endDate.getDate().toString().padStart(2, '0');

      const endDateString = `${endDateYear}-${endDateMonth}-${endDateDay}`;

      console.log("endDateString" + endDateString);

      const apiUrl = `${environment.apiUrl}/v1/public/pdfReport`;

      const params = {
        startDateStr: startDateString,
        endDateStr: endDateString
      };

      this.http.get(apiUrl, { responseType: 'blob', params }).subscribe(
        (response: Blob) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'report.pdf';
          link.click();
        },
        (error) => {
          console.error('Error generating report:', error);
        }
      );
    } else {
      console.warn('Please select both start and end dates.');
    }
  }

  generateExcelReport() {

    if (this.startDate && this.endDate) {

      const startDateYear = this.startDate.getFullYear();
      const startDateMonth = (this.startDate.getMonth() + 1).toString().padStart(2, '0');
      const startDateDay = this.startDate.getDate().toString().padStart(2, '0');

      const startDateString = `${startDateYear}-${startDateMonth}-${startDateDay}`;

      console.log("startDateString" + startDateString);

      const endDateYear = this.endDate.getFullYear();
      const endDateMonth = (this.endDate.getMonth() + 1).toString().padStart(2, '0');
      const endDateDay = this.endDate.getDate().toString().padStart(2, '0');

      const endDateString = `${endDateYear}-${endDateMonth}-${endDateDay}`;

      console.log("endDateString" + endDateString);

      const apiUrl = `${environment.apiUrl}/v1/public/excelReport`;

      const params = {
        startDateStr: startDateString,
        endDateStr: endDateString
      };

      this.http.get(apiUrl, { responseType: 'blob', params }).subscribe(
        (response: Blob) => {
          const blob = new Blob([response], { type: 'text/xls' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'report.xls';
          link.click();
        },
        (error) => {
          console.error('Error generating report:', error);
        }
      );
    } else {
      console.warn('Please select both start and end dates.');
    }
  }
}
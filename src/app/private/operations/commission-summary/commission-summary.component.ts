import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-commission-summary',
  templateUrl: './commission-summary.component.html',
  styleUrls: ['./commission-summary.component.scss']
})
export class CommissionSummaryComponent implements OnInit{

    constructor(private http: HttpClient) {}

   dateRange = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });

    rowData : any;
    url: string = '/assets/data/commission-data.json';

    columnDefs = [
    {
           cellRenderer: params => {
             return '<span><i class="material-icons">money</i></span>';
           },
           width:40,
           resizable: false
      },
      { headerName: 'Service Id', field: 'serviceId',filter: true },
      { headerName: 'Application Id', field: 'applicationId',filter: true },
      { headerName: 'Amount', field: 'amount',filter: true },
      { headerName: 'Settled Date', field: 'settledDate',filter: true },
      { headerName: '', field : 'action', flex:1,
                 cellRenderer: params => {
                 return '<span><i class="material-icons">print</i></span>';
         },
         resizable: false,
      }

    ];

    ngOnInit() {
        this.http.get(this.url).subscribe(res => {
            this.rowData = res;
        });
    }
}

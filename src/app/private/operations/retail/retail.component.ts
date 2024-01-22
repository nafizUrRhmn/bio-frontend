import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.scss']
})
export class RetailComponent implements OnInit{
  constructor(private http: HttpClient) {}

  rowData : any;
  url: string = '/assets/data/grid-data.json';
  
  columnDefs = [
    {
         resizable: false,
         width : 40,
         cellRenderer: params => {
                return '<span class="icon-cell" style="display: flex; margin-top:10px; align-items: center; justify-content: center;">' +
                '<i class="material-icons">account_circle</i>' +
                '</span>';
              }
         },
     {headerName: 'Name', field:'name',filter: true,},
     { headerName: 'Id', field: 'id',filter: true },
     { headerName: 'Mobile', field: 'mobile',filter: true },
     { headerName: 'KYC Status', field: 'kycstatus',filter: true},
     { headerName: '', field : 'action', flex:1 },
     { headerName: '', field : 'action1', flex:1},
     { headerName: '', field : 'action2', flex:1,
                cellRenderer: params => {
                return '<span ><i class="material-icons">print</i></span>';
        }
     },
     

   ];
  ngOnInit(): void {
     this.http.get(this.url).subscribe(res => {
                      this.rowData = res;
        });
  }
}

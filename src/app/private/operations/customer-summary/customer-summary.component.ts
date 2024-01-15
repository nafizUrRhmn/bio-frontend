import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MigrationIconRenderer} from "./migration-icon.component";
import {ProfileViewIconRenderer} from "./profileview-icon.component";
import {PanelViewComponent} from "../customer-summary/panel-view/panel-view.component";
import {GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-customer-summary',
  templateUrl: './customer-summary.component.html',
  styleUrls: ['./customer-summary.component.scss']
})
export class CustomerSummaryComponent implements OnInit{

    constructor(private http: HttpClient) {}

    rowData : any;
    url: string = '/assets/data/grid-data.json';

    public loadingOverlayComponent: any = PanelViewComponent;

    //dummyComponent : any;

    /*defaultColDef = {
      sortable: true,
      filter: true
    };*/

    columnDefs = [
     {
          resizable: false,
          width : 40,
          cellRenderer: params => {
                 return '<span><i class="material-icons">account_circle</i></span>'
               }
          },
     {
          headerName: 'Name',
          field:'name',
          filter: true,
      },
      { headerName: 'Id', field: 'id',filter: true },
      { headerName: 'Mobile', field: 'mobile',filter: true },
      { headerName: 'KYC Status', field: 'kycstatus',filter: true},
      { headerName: '', field : 'action', flex:1 ,cellRenderer: ProfileViewIconRenderer },
      { headerName: '', field : 'action1',flex:1, cellRenderer: MigrationIconRenderer},
      { headerName: '', field : 'action2', flex:1,
                 cellRenderer: params => {
                 return '<span><i class="material-icons">print</i></span>';
         }
      }

    ];

    ngOnInit() {
        this.http.get(this.url).subscribe(res => {
                      this.rowData = res;
        });
    }
}

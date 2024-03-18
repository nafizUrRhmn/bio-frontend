import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AgGridEvent, ColDef} from 'ag-grid-community';
import {EventNamesConstant} from "../../../../_constants/event-names.constant";
import {EventBusService} from "../../../../_services/event-bus.service";

@Component({
  selector: 'app-agb-list',
  templateUrl: './agb-list.component.html',
  styleUrls: ['./agb-list.component.scss']
})
export class AgbListComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AgbListComponent>,
              private eventBus: EventBusService) {
  }

  rowData: any;
  columnDefs: ColDef[];
  name: string;
  messageDetails: string;

  ngOnInit(): void {
    this.name = "Reference Type List";
    const listObj$ = this.eventBus.getObservable(EventNamesConstant.MODAL_LIST);
    listObj$.subscribe(list => {
      this.messageDetails = list.listObj.message + ' Current Page No.' + list.listObj.curPageNum + ' Max Page No.' + list.listObj.maxPageNum;
      //this.message = list.listObj.message;
      //this.curPageNo = 'Current Page No.'+list.listObj.curPageNum;
      //this.maxPageNo = 'Max Page No. '+list.listObj.maxPageNum;
      this.setHeaderNames(list.listObj.headerInfo);
      this.setGridData(list.listObj.headerInfo, list.listObj.dataBlock);
    });
  }

  setHeaderNames(headerInfo: string[]) {
    this.columnDefs = [];
    // for serial number
    let definition: ColDef = {headerName: "SL", valueGetter: "node.rowIndex + 1",flex:1};
    this.columnDefs.push(definition);

    headerInfo.forEach((header: string) => {
      definition = {headerName: header, field: header, flex: 1};
      this.columnDefs.push(definition);
    });
  }

  setGridData(headerInfo: string[], dataBlock: String[]) {
    this.rowData = [];
    for (let row of dataBlock) {
      let jsonObj = {}
      for (let i = 0; i < row.length; i++) {
        jsonObj[headerInfo[i]] = row[i];
      }
      console.log(jsonObj);
      this.rowData.push(jsonObj);
    }
  }

  onSortChanged(e: AgGridEvent) {
    e.api.refreshCells();
  }

  onFilterChanged(e: AgGridEvent) {
    e.api.refreshCells();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ColDef, GridApi, SelectionChangedEvent} from 'ag-grid-community';
import {AgGridAngular} from "ag-grid-angular";
import {take} from "rxjs";
import {RefCodeTypeMaintService} from "../../../_services/refcodetype-maint.service";
@Component({
  selector: 'app-agb-list',
  templateUrl: './agb-list.component.html',
  standalone: true,
  styleUrls: ['./agb-list.component.scss'],
  imports: [AgGridAngular]
})
export class AgbListComponent implements OnInit {
  private gridApi: GridApi;
  constructor(public dialogRef: MatDialogRef<AgbListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private refCodeService: RefCodeTypeMaintService) {
  }

  rowData: any;
  columnDefs: ColDef[];
  title: string;
  messageDetails: string;
  selectionMode: any = 'single';
  pageNumber:number=1;

  ngOnInit(): void {
    const payLoad = {
      "functionCode": this.data.callingParams.functionCode,
      "refCodeType":this.data.callingParams.refType,
      "numOfRecsPerPage" : 10,
      "pageNum" : this.pageNumber
    };
    this.refCodeService.getRefTypeList(payLoad)
      .pipe(take(1))
      .subscribe({
        next: (listBlock) => {
          console.log(listBlock);
          this.messageDetails = listBlock.message + ' Current Page No.' + listBlock.curPageNum + ' Max Page No.' + listBlock.maxPageNum;
          this.setHeaderNames(listBlock.numberOfRecs,listBlock.headerInfo);
          this.setGridData(listBlock.numberOfRecs,listBlock.headerInfo, listBlock.dataBlock);
        }
      });
    /*this.title = this.data.title;
    let listObj = this.data.content;
    this.messageDetails = listObj.message + ' Current Page No.' + listObj.curPageNum + ' Max Page No.' + listObj.maxPageNum;
    this.setHeaderNames(listObj.numberOfRecs,listObj.headerInfo);
    this.setGridData(listObj.numberOfRecs,listObj.headerInfo, listObj.dataBlock);*/
  }

  setHeaderNames(numberOfRecs:number,headerInfo: string[]) {
    this.columnDefs = [];
    let definition: ColDef;
    // for serial number
    if(numberOfRecs > 0){
      definition = {headerName: "SL",field:'sl', valueGetter: "node.rowIndex + 1", flex: 1};
    }else {
      definition = {headerName: "SL",field:'sl',flex: 1};
    }
    this.columnDefs.push(definition);

    headerInfo.forEach((header: string) => {
      definition = {headerName: header, field: header, flex: 1};
      this.columnDefs.push(definition);
    });
  }

  setGridData(numberOfRecs:number,headerInfo: string[], dataBlock: String[]) {
    this.rowData = [];
    if(numberOfRecs >0){
      for (let row of dataBlock) {
        let jsonObj = {}
        for (let i = 0; i < row.length; i++) {
          jsonObj[headerInfo[i]] = row[i];
        }
        this.rowData.push(jsonObj);
      }
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    const selectedData = this.gridApi.getSelectedRows()[0];
    this.dialogRef.close(selectedData);
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  onNextPage() {
    this.pageNumber++;
    const payLoad = {
      "functionCode": this.data.callingParams.functionCode,
      "refCodeType":this.data.callingParams.refType,
      "numOfRecsPerPage" : 10,
      "pageNum" : this.pageNumber
    };
    this.refCodeService.getRefTypeList(payLoad)
      .pipe(take(1))
      .subscribe({
        next: (listBlock) => {
          //console.log(listBlock);
          this.setGridData(listBlock.numberOfRecs,listBlock.headerInfo, listBlock.dataBlock);
        }
      });
  }

  onPrevPage() {
    this.pageNumber--;
  }
}

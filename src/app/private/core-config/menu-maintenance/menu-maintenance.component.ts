import {Component, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from "@angular/material/stepper";
import {MenuMaintenanceService} from "./menu-maintenance.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../_services/alert-service";
import {AgbListComponent} from "../../../shared/components/agb-list/agb-list.component";
import {MrhBlock} from "../../../_models/socket-payload/mrh-block";
import {ColDef} from "ag-grid-community";
import {NrxGridComponent} from "../../../shared/components/nrx-grid/nrx-grid.component";
import {MenuFormData} from "./menu-form-data";
import {EventBusService} from "../../../_services/event-bus.service";
import {take} from "rxjs";
import {NavigationService} from "../../../theme/layout/private-layout/navigation/nav-content/navigation.service";

@Component({
  selector: 'app-menu1',
  templateUrl: './menu-maintenance.component.html',
  styleUrls: ['./menu-maintenance.component.scss'],
})
export class MenuMaintenanceComponent {

  @ViewChild('stepper', {read: MatStepper}) stepper: MatStepper;

  @ViewChild(NrxGridComponent) nrxGrid: NrxGridComponent;
  menuSearchForm = this._formBuilder.group({
    funcCode: '',
    menuId: ''
  });
  parentMenuForm = this._formBuilder.group({
    parMenuCode: '',
    parMenuCodeDesc: '',
    levelCode: '',
    delFlg: '',
    entityCreFlg: '',
    lchgTime: ''
  });

  mopCodeDescMrh: MrhBlock;
  mopCodeDescList: any[];

  mopPermMrh: MrhBlock;
  mopPermList: any[];
  // menuObj = {'menuId': '', 'menuTp': 'N/A', 'menuDesc': 'N/A'};
  menuSaveForm = this._formBuilder.group({
    delFlg: '',
    lchgTime: '',
    menuId: '',
    module: '',
    menuTp: 'R',
    lchgUserId: '',
    secuInd: 'I',
    languageDetails: new FormArray([]),
    hasAdd: false,
    addAutoVerify: [{value: false, disabled: true}],
    hasDelete: false,
    deleteAutoVerify: [{value: false, disabled: true}],
    hasUndelete: false,
    undeleteAutoVerify: [{value: false, disabled: true}],
    hasModification: false,
    modificationAutoVerify: [{value: false, disabled: true}],
    hasVerify: false,
    hasCancel: false,
    param1: '',
    param2: '',
    param3: '',
    param4: '',
    param5: '',
    menuIdSource: ''
  },);

  menuFormData: MenuFormData;

  mopParemListrowData: any;
  mopParemListcolumnDefs: ColDef[];
  modules = [{key: 'ACCESS_CONTROL', moduleName: 'ACCESS CONTROL'}, {key: 'OPERATIONS', moduleName: 'OPERATIONS'},
    {key: 'CCONF', moduleName: 'CORE CONFIG'}]

  // parentRows = [];
  isUpdate = false;
  // updateEvent: any;
  updateNode: any;
  funcCodeOptions: any;
  menuIdSource: any;

  constructor(private _formBuilder: FormBuilder, private navService: NavigationService,
              private menuMaintenanceService: MenuMaintenanceService,
              private dialog: MatDialog, private alertService: AlertService, private eventBus: EventBusService) {

  }

  ngOnInit(): void {
    this.menuIdSource = this.navService.getMenuId();
    this.mopParemListcolumnDefs = [
      {field: 'parMenuCode', headerName: 'Parent Menu', colId: 'parMenuCode'},
      {field: 'parMenuCodeDesc', headerName: 'Parent Menu Desc'},
      {field: 'entityCreFlg', hide: true},
      {field: 'lchgTime', hide: true},
      {field: 'levelCode', headerName: 'Level'},
      {field: 'delFlg', headerName: 'Delete?'}
    ];
  }

  onSearchMenuId() {
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {
        title: 'Menu List',
        serviceName: 'getMenuByMenuId',
        srchPayLoad: this.menuSearchForm.value,
      },
      disableClose: true
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      this.menuFormData = {...this.menuFormData, ...res};
      this.menuSearchForm.get('menuId').setValue(this.menuFormData.menuId);
    });
  }

  get funCode() {
    return this.menuSearchForm.get('funcCode').value;
  }

  get menuId() {
    return this.menuSearchForm.get('menuId').value;
  }

  get isDisabled() {
    return (this.parentMenuForm.get('lchgTime').value && this.isUpdate) ? true : false;
  }

  onNext() {
    this.menuMaintenanceService.menuVerification(this.menuSearchForm.value).subscribe({
      next: (response) => {
        this.menuFormData = response?.genDataBlock?.formData;
        this.funcToFormSet(this.menuFormData.param5);
        this.menuSaveForm.patchValue(this.menuFormData);
        const mrhBlocks: MrhBlock[] = response?.mrhBlock.mrhBlocks;
        for (let mrhBlock of mrhBlocks) {
          if (mrhBlock.listName === 'mopCodeDescList' && mrhBlock.numberOfRecs > 0) {
            this.mopCodeDescMrh = mrhBlock;
            this.mopCodeDescList = this.mrhBlockToGrid(mrhBlock);
            for (const mop of this.mopCodeDescList) {
              let featureNameForm = new FormGroup({
                langCode: new FormControl('', Validators.required),
                langCodeDesc: new FormControl('', Validators.required),
                menuDesc: new FormControl('', Validators.required),
                delFlg: new FormControl(''),
                lchgTime: new FormControl('')
              });
              (this.menuSaveForm.get('languageDetails') as FormArray).push(featureNameForm);
            }

            this.menuSaveForm.get('languageDetails').patchValue(this.mopCodeDescList);
          } else if (mrhBlock.listName === 'mopPermList' && mrhBlock.numberOfRecs > 0) {
            this.mopPermMrh = mrhBlock;
            this.mopPermList = this.mrhBlockToGrid(mrhBlock);
          }
        }
        this.stepper.next()
      },
      error: err => {
        this.alertService.errorAlert(err.error.message);
      }
    });

    // this.stepper.next()
  }

  onCancel() {
    this.menuSaveForm.reset();
    this.parentMenuForm.reset();
    this.nrxGrid.gridApi.setRowData([]);
    this.stepper.reset()
  }

  onSave() {
    let rows = []
    this.nrxGrid.gridApi.getRenderedNodes().forEach(u => rows.push(u.data));
    let formData = this.menuSaveForm.getRawValue();
    formData = {...formData, 'menuId': this.menuId, 'menuIdSource': this.menuIdSource};
    let languageDetails = this.menuSaveForm.get('languageDetails').value;
    delete formData.languageDetails;
    this.mopPermMrh.dataBlock = this.gridToMrhBlock(rows, this.mopPermMrh.headerInfo);
    this.mopCodeDescMrh.dataBlock = this.gridToMrhBlock(languageDetails, this.mopCodeDescMrh.headerInfo);
    let payload = {
      'formData': formData, 'mopPermMrh': this.mopPermMrh,
      'mopCodeDescMrh': this.mopCodeDescMrh
    }

    this.menuMaintenanceService.menuSave(payload).pipe(take(1)).subscribe({
      next: (v) => this.alertService.successAlert("Data Save Successfully")
        .then(() => {
          this.menuSaveForm.reset();
          this.stepper.reset();
        }),
      error: (e) => this.alertService.errorAlert("Password Change Failed")
    });
  }

  onMenuTypeChange($event) {
    this.menuFormData.menuTp = $event.target.value;

  }

  checkBoxValues() {
    if (this.menuSaveForm.get('hasAdd').value) {
      this.menuSaveForm.get('addAutoVerify').enable({onlySelf: true});
    } else {
      this.menuSaveForm.get('addAutoVerify').setValue(false);
      this.menuSaveForm.get('addAutoVerify').disable({onlySelf: true});
    }
    if (this.menuSaveForm.get('hasDelete').value) {
      this.menuSaveForm.get('deleteAutoVerify').enable({onlySelf: true});
    } else {
      this.menuSaveForm.get('deleteAutoVerify').disable({onlySelf: true});
      this.menuSaveForm.get('deleteAutoVerify').setValue(false);
    }

    if (this.menuSaveForm.get('hasUndelete').value) {
      this.menuSaveForm.get('undeleteAutoVerify').enable({onlySelf: true});
    } else {
      this.menuSaveForm.get('undeleteAutoVerify').setValue(false);
      this.menuSaveForm.get('undeleteAutoVerify').disable({onlySelf: true});
    }
    if (this.menuSaveForm.get('hasModification').value) {
      this.menuSaveForm.get('modificationAutoVerify').enable({onlySelf: true});
    } else {
      this.menuSaveForm.get('modificationAutoVerify').setValue(false);
      this.menuSaveForm.get('modificationAutoVerify').disable({onlySelf: true});
    }
  }

  mrhBlockToGrid(mrhBlock: MrhBlock) {
    let list = [];
    for (let i = 0; i < mrhBlock.dataBlock.length; i++) {
      let obj = {}
      for (let j = 0; j < mrhBlock.headerInfo.length; j++) {
        let key = mrhBlock.headerInfo[j];
        let value = mrhBlock.dataBlock[i][j];
        obj = {...obj, [key]: value};
      }
      list.push(obj);
    }
    return list;
  }


  gridToMrhBlock(list: any[], headerInfo: string[]) {
    let dataBlock = [];
    let rowData = [];
    // Constructing dataBlock array
    for (let item of list) {
      let rowData = [];
      for (let key of headerInfo) {
        rowData.push(item[key]);
      }
      dataBlock.push(rowData);
    }
    return dataBlock;
  }


  onSearchParentMenuId() {
    const data = {
      'menuId': '',
      'funcCode': 'I'
    };
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {
        title: 'Menu List',
        serviceName: 'getMenuByMenuId',
        srchPayLoad: data,
      },
      disableClose: true
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      this.parentMenuForm.get('parMenuCode').patchValue(<never>res?.menuId)
      this.parentMenuForm.get('parMenuCodeDesc').patchValue(<never>res?.menuDesc)
    });
  }

  addOnParentGrid(type: string) {
    let formData = this.parentMenuForm.value;
    formData = {...formData, 'delFlg': formData.delFlg ? 'Y' : 'N'};
    let parentRows = <any>this.nrxGrid.gridApi.getRenderedNodes();
    let arr = [];
    let obj = parentRows.find(u => u.parMenuCode === formData.parMenuCode);
    if (!this.isUpdate && obj) {
      this.alertService.warningAlert(`Parent menu already exist ${obj.parMenuCode}`)
      return;
    }

    if (this.isUpdate) {
      this.updateNode.updateData(formData);
    } else {
      arr.push(formData);
    }
    this.nrxGrid.onGridReset(arr, type);
    this.parentMenuForm.reset();
    this.isUpdate = false;
  }

  onRowClick($event) {
    this.updateNode = $event.node;
    $event.data.delFlg = $event.data.delFlg === 'Y' ? true : false;
    this.parentMenuForm.patchValue($event.data);
    this.isUpdate = true;
  }

  funcToFormSet(param5: string){
    if(!param5)
      return;
    const arr= param5.split(',');
    console.log(arr);
    for(let i =0; i< arr.length; i++){
     let value = arr[i].split('-');

     switch (value[0]){
       case "A": {
        this.menuSaveForm.get('hasAdd').setValue(true);
        if(value[1] && value[1]=='Y'){
          this.menuSaveForm.get('addAutoVerify')!.setValue( true);
        }
         break;
       }
       case "D": {
         this.menuSaveForm.get('hasDelete').setValue(true);
         if(value[1] && value[1]=='Y'){
           this.menuSaveForm.get('deleteAutoVerify').setValue(true);
         }
         break;
       }
       case "U": {
         this.menuSaveForm.get('hasUndelete').setValue(true);
         if(value[1] && value[1]=='Y'){
           this.menuSaveForm.get('undeleteAutoVerify').setValue(true);
         }
         break;
       }
       case "M": {
         this.menuSaveForm.get('hasModification').setValue(true);
         if(value[1] && value[1]=='Y'){
           this.menuSaveForm.get('modificationAutoVerify')!.setValue(true); //@ts-ignore
         }
         break;
       }
       case "V": {
         this.menuSaveForm.get('hasVerify').setValue(true);
         break;
       }case "X": {
         this.menuSaveForm.get('hasCancel').setValue(true);
         break;
       }
       default: {
         console.log('type mismatch ' + value[0]);
         break;
       }
     }
    }

  }
}


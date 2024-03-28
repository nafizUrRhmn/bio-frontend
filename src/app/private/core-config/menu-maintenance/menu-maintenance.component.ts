import {Component, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from "@angular/material/stepper";
import {MenuMaintenanceService} from "./menu-maintenance.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../_services/alert-service";
import {AgbListComponent} from "../../../shared/components/agb-list/agb-list.component";
import {MrhBlock} from "../../../_models/socket-payload/mrh-block";

@Component({
  selector: 'app-menu1',
  templateUrl: './menu-maintenance.component.html',
  styleUrls: ['./menu-maintenance.component.scss'],
})
export class MenuMaintenanceComponent {

  @ViewChild('stepper', {read: MatStepper}) stepper: MatStepper;
  menuSearchForm = this._formBuilder.group({
    funcCode: '',
    menuId: ''
  });


  menuObj = { 'menuId': '', 'menuTp': 'N/A', 'menuDesc': 'N/A'};
  menuSaveForm = this._formBuilder.group({
    module: '',
    menuType: 'root',
    featureNames: new FormArray([]),
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
    param5: ''
  }, );


  languages = ['BAN', 'ENG'];
  modules = [{key: 'ACCESS_CONTROL', moduleName: 'ACCESS CONTROL'}, {key: 'OPERATIONS', moduleName: 'OPERATIONS'},
    {key: 'CCONF', moduleName: 'CORE CONFIG'}]
  menuType = '';


  constructor(private _formBuilder: FormBuilder,
              private menuMaintenanceService: MenuMaintenanceService,
              private dialog: MatDialog, private alertService: AlertService) {
    // this.menuCreationForm = this.fb.group({});
  }

  ngOnInit(): void {
    // this.menuCreationForm = this.fb.group({

    // });

    for (const lang of this.languages) {
      let featureNameForm = new FormGroup({
        language: new FormControl(lang, Validators.required),
        name: new FormControl('', Validators.required),
        remarks: new FormControl('', Validators.required)
      });
      (this.menuSaveForm.get('featureNames') as FormArray).push(featureNameForm);
    }

  }

  onSearchMenuId() {
    this.menuMaintenanceService.getMenuByMenuId(this.menuSearchForm.value).subscribe({
      next: (response) => {
        this.openDialogue(response);
      },
      error: err => {
        this.alertService.errorAlert(err.error.message);
      }
    });
  }

  openDialogue(response: any) {
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {title: 'Reference Type List', content: response},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res => {
      this.menuObj = res;
      this.setFormFields(this.menuObj);
    });
  }

  private setFormFields(menuObj: any) {
    this.menuSearchForm.get('menuId').setValue(menuObj.menuId);
  }

  onNext() {
    this.menuMaintenanceService.menuVerification(this.menuSearchForm.value).subscribe({
      next: (response) => {
        console.log(response);
        let mopCodeDescList = [];
        let mopPermList = [];
        const mrhBlocks:MrhBlock[] = response?.mrhBlock.mrhBlocks;
        for(let mrhBlock of mrhBlocks){
          if(mrhBlock.listName === 'mopCodeDescList' && mrhBlock.numberOfRecs>0){
            mopCodeDescList = this.mrhBlockToGrid(mrhBlock);
          }else if (mrhBlock.listName === 'mopPermList' && mrhBlock.numberOfRecs>0){
            mopPermList = this.mrhBlockToGrid(mrhBlock);
          }
          console.log(mopCodeDescList);
          console.log(mopPermList);
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
    this.stepper.reset()
  }

  onSave() {
  console.log(this.menuSaveForm.getRawValue())
  }

  onMenuTypeChange($event) {
    console.log($event.target.value);
    this.menuType = $event.target.value;
    console.log(this.menuSaveForm.value);
  }

  checkBoxValues() {
    if(this.menuSaveForm.get('hasAdd').value){
      this.menuSaveForm.get('addAutoVerify').enable({onlySelf: true});
    }else{
      this.menuSaveForm.get('addAutoVerify').setValue(false);
      this.menuSaveForm.get('addAutoVerify').disable({onlySelf: true});
    }
    if(this.menuSaveForm.get('hasDelete').value){
      this.menuSaveForm.get('deleteAutoVerify').enable({onlySelf: true});
    } else{
      this.menuSaveForm.get('deleteAutoVerify').disable({onlySelf: true});
      this.menuSaveForm.get('deleteAutoVerify').setValue(false);
    }

    if(this.menuSaveForm.get('hasUndelete').value){
      this.menuSaveForm.get('undeleteAutoVerify').enable({onlySelf: true});
    }else {
      this.menuSaveForm.get('undeleteAutoVerify').setValue(false);
      this.menuSaveForm.get('undeleteAutoVerify').disable({onlySelf: true});
    }
    if(this.menuSaveForm.get('hasModification').value){
      this.menuSaveForm.get('modificationAutoVerify').enable({onlySelf: true});
    }else{
      this.menuSaveForm.get('modificationAutoVerify').setValue(false);
      this.menuSaveForm.get('modificationAutoVerify').disable({onlySelf: true});
    }
  }

  mrhBlockToGrid(mrhBlock: MrhBlock){
    let list= [];
    for (let i = 0; i < mrhBlock.dataBlock.length; i++) {
      let obj = {}
      for (let j = 0; j < mrhBlock.headerInfo.length; j++) {
        let key = mrhBlock.headerInfo[j];
        console.log('keh'+ key);
        let value =  mrhBlock.dataBlock[i][j];
        console.log('value'+ value);
        obj = {...obj, [key]: value};
      }
      list.push(obj);
    }
    return list;
  }
}

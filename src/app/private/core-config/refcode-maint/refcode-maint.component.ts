import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AgbListComponent } from "../../../shared/components/agb-list/agb-list.component";
import { NavigationService } from "../../../theme/layout/private-layout/navigation/nav-content/navigation.service";
import { RefCodeMaintService } from "./refcode-maint.service";
import { take } from "rxjs";
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-refcode-maint',
  templateUrl: './refcode-maint.component.html',
  styleUrls: ['./refcode-maint.component.scss']
})
export class RefCodeMaintComponent implements OnInit {

  isLinear = false;
  mopCodeDescList: any;
  refTypeDesc: string;
  refCodeDesc: string;
  refCodeForm: FormGroup;
  refCodeDetailForm: FormGroup;
  funcCodeOptions = [];
  isHiddenRefCodeSrchBtn: boolean;
  depFlg: string;
  delFlg:string;
  menuId:string;
  lchgTime:string;
  depRefCodeType:string;
  depRefCodeDesc: any;
  isInquiry: boolean = false;
  isDelete: boolean = false;



  @ViewChild('stepper', { read: MatStepper }) stepper: MatStepper
  alertService: any;



  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public refCodeMaintService: RefCodeMaintService,
    private navService: NavigationService) {
  }

  ngOnInit() {
    //this.funcCodeOptions = this.navService.getPermittedOptions();
    this.refCodeForm = this.fb.group({
      funcCode: ['', [Validators.required]],
      refCodeType: ['', [Validators.required]],
      refCode: ['', Validators.required],
      depFlg: [''],
      delFlg:[''],
      lchgTime:[''],
      menuId:[''],

    });
    this.refCodeDetailForm = this.fb.group({
      shortListFlg: ['', [Validators.required]],
      depRefCode: [''],
      language: this.fb.array([])
    });
    this.isHiddenRefCodeSrchBtn = false;
  }

  onSrchRefType(funcCode: string, refTypeOrDsc: string) {
    const payLoad = {
      "functionCode": funcCode,
      "refCodeType": refTypeOrDsc
    };
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {
        title: 'Reference Type Data',
        serviceName: 'getRefTypeList',
        srchPayLoad: payLoad,
      },
      disableClose: true
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(selectedRow => {
      this.refCodeType.setValue(selectedRow?.refCodeType);
      this.refTypeDesc = selectedRow?.refCodeTypeDesc;
    });
  }

  onSrchRefCode(funcCode: string, refTypeOrDesc: string, refCodeOrDesc: string) {
    const payLoad = {
      "funcCode": funcCode,
      "refCodeType": refTypeOrDesc,
      "refCode": refCodeOrDesc
    };
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {
        title: 'Reference Code Data',
        serviceName: 'getRefCodeList',
        srchPayLoad: payLoad,
      },
      disableClose: true
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(selectedRow => {
      this.refCode.setValue(selectedRow?.refCode);
      this.refCodeDesc = selectedRow?.refCodeDesc;
    });
  }


  onSrchdepRefCode(funcCode: string, refTypeOrDesc: string, refCodeOrDesc: string) {
    const payLoad = {
      "funcCode": funcCode,
      "refCodeType": refTypeOrDesc,
      "refCode": refCodeOrDesc
    };
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {
        title: 'Reference Code Data',
        serviceName: 'getRefCodeList',
        srchPayLoad: payLoad,
      },
      disableClose: true
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(selectedRow => {
      console.log(selectedRow);
      this.depRefCode.setValue(selectedRow?.refCode);
      this.depRefCodeDesc = selectedRow?.refCodeDesc;
    });
  }

  onNext() {
    if (this.refCodeForm.invalid) {
      return;
    }

    const payLoad = {
      "funcCode": this.funcCode.value,
      "refCodeType": this.refCodeType.value,
      "refCode": this.refCode.value,

    };
    this.refCodeMaintService.getRefCodeDetail(payLoad)
      .pipe(take(1))
      .subscribe((response) => {
        if (response.genDataBlock.formData) {
          this.depRefCodeType = response.genDataBlock.formData.depRefCodeType          
          this.depRefCodeDesc = response.genDataBlock.formData.depRefCodeDesc;
          this.depFlg = response.genDataBlock.formData.depFlg;
          this.refCodeForm.patchValue({ depFlg: this.depFlg });
          this.refCodeForm.patchValue({delFlg:'N'});
          this.refCodeForm.patchValue({menuId:'RCMM'});
          this.refCodeForm.patchValue({lchgTime:''});
          this.refCodeDetailForm.patchValue(response.genDataBlock.formData);
          this.mopCodeDescList = this.mrhBlockToGrid(response.mrhBlock.mrhBlocks[0]);

          console.log(this.refCodeDetailForm);

          const mrh = this.gridToMrhBlock(this.mopCodeDescList);
           console.log(response);     

          for (const mop of this.mopCodeDescList) {
            let featureFrom = new FormGroup({
              refCodeDesc: new FormControl(''),
              refCodeLang: new FormControl(''),
              refCodeLangDesc: new FormControl(''),
              delFlg: new FormControl('N'),
              lchgTime:new FormControl(''),
            });
            (this.refCodeDetailForm.get('language') as FormArray).push(featureFrom);
          }
          this.refCodeDetailForm.get('language').patchValue(<any[]>this.mopCodeDescList);
        }
      });
  };


  mrhBlockToGrid(mrhBlock: any) {
    let list = [];
    for (let i = 0; i < mrhBlock.dataBlock.length; i++) {
      let obj = {}
      for (let j = 0; j < mrhBlock.headerInfo.length; j++) {
        let key = mrhBlock.headerInfo[j];
        let value = mrhBlock.dataBlock[i][j];
        obj = { ...obj, [key]: value };
      }
      list.push(obj);
    }
    return list;
  }


  gridToMrhBlock(list: any[]) {
    let mrhBlock = {
      headerInfo: [],
      dataBlock: []
    };

       if (list.length > 0) {
      mrhBlock.headerInfo = Object.keys(list[0]);
    }

    for (let item of list) {
      let rowData = [];
      for (let key of mrhBlock.headerInfo) {
        rowData.push(item[key]);
      }
      mrhBlock.dataBlock.push(rowData);
    }

    return mrhBlock;
  }


  onChangeFuncCode(event: any) {
    this.refCodeForm.patchValue({ refCodeType: '', refCode: '' });
    this.refTypeDesc = '';
    this.refCodeDesc = '';
    switch (this.funcCode.value) {
      case 'I': {
        this.isInquiry = (event.target.value === 'I');
        this.isHiddenRefCodeSrchBtn = false;
      }
        break;
      case 'C': {
        this.isDelete = true;
      }
        break;
      case 'D':
      case 'V': {
      }
        break;
      case 'A': {
       
        this.isHiddenRefCodeSrchBtn = true;
      }
        break;
      case 'U':
      case 'M':
      case 'X': {
        this.isHiddenRefCodeSrchBtn = true;
      }
        break;
      default:
        break;
    }
  }

  isInquirySelected(): boolean {
    return this.isInquiry;
  }

  onSubmit() {

    const payload = {
      ...this.refCodeForm.value,
      ...this.refCodeDetailForm.value
    };
    console.log(payload);

    this.refCodeMaintService.submit(payload).pipe(take(1)).subscribe({
      next: (v) => {
        this.alertService.successAlert(v.responseMessage);
      },
      error: (err) => {
        this.alertService.errorAlert(err.error.message);
      }
    });

   }


   clearRefCodeFormFields() {
    this.refCodeForm.reset();
    this.refCodeDesc='';
    this.refTypeDesc='';
  }
  

  get funcCode() {
    return this.refCodeForm.get('funcCode');
  }

  get refCodeType() {
    return this.refCodeForm.get('refCodeType');
  }

  get refCode() {
    return this.refCodeForm.get('refCode');
  }

  get shortListFlg() {
    return this.refCodeForm.get('shortListFlg');
  }

  get depRefCode() {
    return this.refCodeDetailForm.get('depRefCode');
  }

  get langCode() {
    return this.refCodeForm.get('langCode');
  }

  onFocusOutEvent($event: any) {
  }

}

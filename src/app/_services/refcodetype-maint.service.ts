import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

class Refcodetype {
  functionCode?:string;
  refCodeType?:string;
  refCodeTypeDesc?:string;
  deleteFlg?:string;
  lchgTime?:string;
  dependentFlg?:string;
  dependentRefCodeType?:string;
  depRefCodeTypeDesc?:string;
  refCodeLength?:string;
  menuId?:string;
}
@Injectable({providedIn: 'root'})
export class RefCodeTypeMaintService {
  baseUrl = `${environment.apiUrl}/v1`;
  constructor(
    private http: HttpClient) {
  }
  getRefTypeList(funCode:string, refCodeType:string) {
    return this.http.post<any>(`${this.baseUrl}/get-refType-list`, {funCode, refCodeType})
  }

  getRefTypeDetail(funCode:string, refCodeType:string) {
    return this.http.post<any>(`${this.baseUrl}/get-refType-detail`, {funCode, refCodeType})
  }

  submit(payLoad:Refcodetype){
    return this.http.post<any>(`${this.baseUrl}/submit`, payLoad)
  }
}

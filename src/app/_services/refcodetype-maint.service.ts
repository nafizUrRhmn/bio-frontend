import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class RefcodetypeMaintService {
  baseUrl = `${environment.apiUrl}/v1`;
  constructor(
    private http: HttpClient) {
  }
  getRefTypeList(funCode:string, refTypeOrDsc:string) {
    return this.http.post<any>(`${this.baseUrl}/public/get-refType-list`, {funCode, refTypeOrDsc})
  }
}

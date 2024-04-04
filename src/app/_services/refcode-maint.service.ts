import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class RefCodeMaintService {
  baseUrl = `${environment.apiUrl}/v1`;
  constructor(private http: HttpClient) {}
  getRefCodeDetail(payLoad:any) {
    return this.http.post<any>(`${this.baseUrl}/refcode/get-refCode-detail`, payLoad)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface ApiResponse {
  ResponseCode: number;
  ResponseRemarks: string;
  ResponseData: string;
  status:number;
}

@Injectable({
  providedIn: 'root'
})
export class FingerprintCaptureService {

  baseUrl = `${environment.apiUrl}/v1`;

  fingerCaptureUrl = 'http://localhost:4200/biocapture/6D696F724F676B656B466A7274577A794F5155644C42786A4B54714E366E586A73632F354453412F444F537949734E523556527639684F7A57662F694E496B547C237E237C36322438345E6A687C237E237C57';

  constructor(private http: HttpClient) {}

  fingerDataCapture(){
    return  this.http.get<ApiResponse>(this.fingerCaptureUrl, { withCredentials: false })
  }

  submit(payload: any) {
    return this.http.post(`${this.baseUrl}/finger-data/save`, payload)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DetailsService {

  baseUrl = `${environment.apiUrl}/v1`;

  constructor(private http: HttpClient) { }

  submit(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/save/retail-onboarding-details`, payload)
  }

}

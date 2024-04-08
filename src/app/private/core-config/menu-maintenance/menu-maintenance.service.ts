import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class MenuMaintenanceService {

  constructor(private httpClient: HttpClient) {
  }


  baseUrl = `${environment.apiUrl}/v1/menu`

  getMenuByMenuId(menuSearchObj: any){
    return this.httpClient.post<any>(`${this.baseUrl}/search-by-menu-id`,menuSearchObj);
  }
  menuVerification(menuSearchObj: any){
    return this.httpClient.post<any>(`${this.baseUrl}/menu-verifications`,menuSearchObj);
  }

  menuSave(payload: any){
    return this.httpClient.post<any>(`${this.baseUrl}/save`,payload);
  }
}

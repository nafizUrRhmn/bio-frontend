import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.scss']
})
export class WelcomeMessageComponent {
  username: any;
  constructor(){
    let jwt ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZ2VudGJhbmsiLCJyb2xlcyI6IlJPTEVfU19BRE1JTixST0xFX1VTRVIiLCJpYXQiOjE3MDY2OTM0NTAsImV4cCI6MTcwNjY5Mzc1MH0.K-Qs88-2Ke0xe5gjzlpE8pbt_Cb4yq65YIzA19ND1ww";
      let encodedPayload = jwt.split('.')[1];
      let decodedPayload = window.atob(encodedPayload);
      let parsedPayload = JSON.parse(decodedPayload);
      this.username = parsedPayload.sub;
      console.log(this.username);
  }
}

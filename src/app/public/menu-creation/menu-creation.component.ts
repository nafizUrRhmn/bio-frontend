import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-menu-creation',
  templateUrl: './menu-creation.component.html',
  styleUrls: ['./menu-creation.component.scss']
})
export class MenuCreationComponent {
  menuCreationForm: FormGroup;


  constructor(private fb : FormBuilder){
    this.menuCreationForm = this.fb.group({});
  }

  ngOnInit():void{
    this.menuCreationForm = this.fb.group({
      
    });
    
  }

}

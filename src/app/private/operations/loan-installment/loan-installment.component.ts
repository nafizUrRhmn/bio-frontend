import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-installment',
  templateUrl: './loan-installment.component.html',
  styleUrls: ['./loan-installment.component.scss']
})
export class LoanInstallmentComponent implements OnInit {
  loanInsMnt: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loanInsMnt = this.fb.group({
      optAcctNo: ['', Validators.required]
    });
  }
  get optAcctNo() {
    return this.loanInsMnt.get('optAcctNo');
  }
}

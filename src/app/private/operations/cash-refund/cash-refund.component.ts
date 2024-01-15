import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cash-refund',
  templateUrl: './cash-refund.component.html',
  styleUrls: ['./cash-refund.component.scss']
})
export class CashRefundComponent implements OnInit {
  cashRefund: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cashRefund = this.fb.group({
      custMobileNum: ['', [Validators.required]]
    });
  }
  get custMobileNum() {
    return this.cashRefund.get('custMobileNum');
  }
}

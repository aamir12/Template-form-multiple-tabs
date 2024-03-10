import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ContractService } from '../contract.service';
import { BasePeriod } from '../model';

@Component({
  selector: 'app-base-periods',
  templateUrl: './base-periods.component.html',
  styleUrls: ['./base-periods.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class BasePeriodsComponent implements OnInit {
  @Input() basePeriods: BasePeriod[] = [];

  baseActive: number = 0;
  constructor(private contractService: ContractService) {}

  ngOnInit() {
    this.moniterActiveTab();
  }

  moniterActiveTab() {
    this.contractService.baseActiveTab$.subscribe((tab) => {
      this.baseActive = tab;
    });
  }

  addOptionPeriod(event: Event) {
    event.preventDefault();
    const basePeriod = new BasePeriod();
    this.basePeriods.push(basePeriod);
    this.baseActive = this.basePeriods.length - 1;
    // this.contractService.setFormSubmitted(false);
  }

  removeBaseIndex(index: number, event: Event) {
    event.preventDefault();
    this.basePeriods.splice(index, 1);

    if (index > 0) {
      this.baseActive = index - 1;
    } else {
      this.baseActive = 0;
    }
  }
}

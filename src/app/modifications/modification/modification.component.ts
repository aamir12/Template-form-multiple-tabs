import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgModelGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContractService } from '../../contract.service';
import { Modification } from '../../model';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgModelGroup }],
})
export class ModificationComponent implements OnInit {
  @Input() modification: Modification;
  @Input() modificationIndex: number = 0;
  @Input() baseIndex: number = 0;
  isSubmitted: boolean = false;
  constructor(private contractService: ContractService) {}

  ngOnInit() {
    this.mointerFormSubmit();
  }

  mointerFormSubmit() {
    this.contractService.isSubmitted$.subscribe((isSubmit) => {
      this.isSubmitted = isSubmit;
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContractService } from './contract.service';
import { Project } from './model';

@Component({
  selector: 'app-component',
  templateUrl: './app-component.html',
  providers: [ContractService],
})
export class AppComponent implements OnInit {
  @ViewChild('heroForm') heroForm!: NgForm;
  project = new Project();
  baseActive = 0;
  modificationActive = 0;
  isSubmitted: boolean = false;

  constructor(private contractService: ContractService) {}

  ngOnInit() {
    this.mointerIsSubmit();
  }

  mointerIsSubmit() {
    this.contractService.isSubmitted$.subscribe((isSubmit) => {
      this.isSubmitted = isSubmit;
    });
  }

  check() {
    const allTabs = document.querySelectorAll('.firstDiv');
    let errorIndexTab = -1;
    let modificationActive = 0;
    for (let i = 0; i < allTabs.length; i++) {
      const tabInputs = allTabs[i].querySelectorAll('.invalid');
      if (tabInputs.length > 0) {
        errorIndexTab = i + 1;
        if (allTabs[i].querySelectorAll('app-child')) {
          const appChild = allTabs[i].querySelector('app-child');

          const childTabs = appChild.querySelectorAll('.secondPane');
          for (let j = 0; j < childTabs.length; j++) {
            const childInputs = childTabs[j].querySelectorAll('.invalid');
            if (childInputs.length > 0) {
              modificationActive = j + 1;
              break;
            }
          }
        }
        break;
      }
    }

    if (errorIndexTab > 0) {
      setTimeout(() => {
        this.baseActive = errorIndexTab;
        this.modificationActive = modificationActive;
      }, 0);
    }
  }

  onSubmit() {
    this.contractService.setFormSubmitted(true);
    if (this.heroForm.invalid) {
      this.contractService.openInValidTab();
      return;
    }
    console.log('aamir', this.project);
    console.log('aamir');
  }
}

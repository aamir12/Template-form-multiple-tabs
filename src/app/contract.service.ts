import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable()
export class ContractService {
  private isSubmitted = new BehaviorSubject<boolean>(false);
  private baseActiveTab = new BehaviorSubject<number>(0);
  private modificationActiveTab = new BehaviorSubject<number>(0);
  isSubmitted$ = this.isSubmitted.asObservable();
  baseActiveTab$ = this.baseActiveTab.asObservable();
  modificationActiveTab$ = this.modificationActiveTab.asObservable();
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setFormSubmitted(value: boolean) {
    this.isSubmitted.next(value);
  }

  setBaseActiveTab(value: number) {
    this.baseActiveTab.next(value);
  }

  setModificationActiveTab(value: number) {
    this.modificationActiveTab.next(value);
  }

  resetAllFlag() {
    this.setFormSubmitted(false);
    this.setBaseActiveTab(0);
    this.setModificationActiveTab(0);
  }

  openInValidTab() {
    let baseActiveTab = 0;
    let modificationTab = 0;
    const allBasePeriods = this.document.querySelectorAll('app-base-period');
    if (allBasePeriods.length > 0) {
      for (let i = 0; i < allBasePeriods.length; i++) {
        const invalidBasePeriod =
          allBasePeriods[i].querySelectorAll('.invalid');
        if (invalidBasePeriod.length > 0) {
          baseActiveTab = i;
          const allModifications =
            allBasePeriods[i].querySelectorAll('app-modification');
          if (allModifications.length > 0) {
            for (let j = 0; j < allModifications.length; j++) {
              const invalidModification =
                allModifications[j].querySelectorAll('.invalid');
              if (invalidModification.length > 0) {
                modificationTab = j;
                break;
              }
            }
          }
          break;
        }
      }
    }

    setTimeout(() => {
      this.setBaseActiveTab(baseActiveTab);
      this.setModificationActiveTab(modificationTab);
    }, 0);
  }
}

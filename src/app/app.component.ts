import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="submit()">
      <button nz-button nzType="primary">Submit</button>
    </form>

    <div *ngFor="let db_section of db_sections; let i=index">
      <label nz-checkbox (nzCheckedChange)="onCheckboxChange($event, db_section.name)">{{db_section.name}}</label>
    </div>



    <button nz-button nzType="default" (click)="showModal()">Add</button>

    <nz-modal [(nzVisible)]="newSectionModalVisiblity" nzTitle="Add New Section" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
      <form [formGroup]="newSectionForm">
        <input nz-input placeholder="Section Name" formControlName="new_section_name" />
      </form>
    </nz-modal>

    `,
})
export class AppComponent {
  public myForm: FormGroup;
  public newSectionForm: FormGroup;
  public newSectionModalVisiblity: boolean = false;
  public db_sections = [
    { name: 'Asaad' },
    { name: 'Miles' },
  ];

  constructor() {
    this.myForm = new FormGroup({
      sections: new FormArray([]),
    });

    this.newSectionForm = new FormGroup({
      new_section_name: new FormControl()
    })
  }


  submit() {
    console.log(this.myForm.value)
  }
  onCheckboxChange(checked, name) {
    const checkArray: FormArray = this.myForm.get('sections') as FormArray;
    if (checked) {
      checkArray.push(new FormControl(name));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == name) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  showModal(): void {
    this.newSectionModalVisiblity = true;
  }

  handleOk(): void {
    const v = this.newSectionForm.value.new_section_name;
    this.db_sections = [...this.db_sections, { name: v }];
    this.newSectionForm.get('new_section_name').reset();
    this.newSectionModalVisiblity = false;
  }

  handleCancel(): void {
    this.newSectionModalVisiblity = false;
  }
}

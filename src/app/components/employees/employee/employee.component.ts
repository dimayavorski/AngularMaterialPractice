import { EmployeeService } from './../../../shared/employee.service';
import { Component, OnInit } from '@angular/core';

const DEPARTMENTS = [
  { id: 1, value: 'Dep 1' },
  { id: 2, value: 'Dep 2' },
  { id: 3, value: 'Dep 3' }
];

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(private service: EmployeeService) {}

  departments = DEPARTMENTS;
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  ngOnInit() {}
}

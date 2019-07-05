import { EmployeeService } from './../../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/shared/department.service';
import { NotificationService } from 'src/app/shared/notification.service';

const DEPARTMENTS = [{ id: 1, value: 'Dep 1' }, { id: 2, value: 'Dep 2' }, { id: 3, value: 'Dep 3' }];

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(
    private service: EmployeeService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService
  ) {}

  departments = DEPARTMENTS;
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  ngOnInit() {
    this.service.getEmployees();
  }
  onSubmit() {
    if (this.service.form.valid) {
      this.service.insertEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
    }
  }
}

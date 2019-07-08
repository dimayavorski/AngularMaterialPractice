import { EmployeeService } from './../../../shared/employee.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'actions'];
  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.employeeService.getEmployees().subscribe(res => {
      let array = res.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
    });
  }
}

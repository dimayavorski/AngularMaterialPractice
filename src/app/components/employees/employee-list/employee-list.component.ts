import { EmployeeService } from './../../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName','email','mobile','city'];
  constructor(private employeeService:EmployeeService) { }


  ngOnInit() {
    this.employeeService.getEmployees().subscribe(res=> {
      let array = res.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.listData = new MatTableDataSource(array);
    });
  }

}

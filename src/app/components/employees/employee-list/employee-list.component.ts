import { DialogService } from './../../../shared/dialog.service';
import { EmployeeComponent } from './../employee/employee.component';
import { DepartmentService } from 'src/app/shared/department.service';
import { EmployeeService } from './../../../shared/employee.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'departmentName', 'actions'];
  searchKey: string;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(res => {
      let array = res.map(item => {
        let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
        return {
          $key: item.key,
          departmentName,
          ...item.payload.val()
        };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };
    });
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {
    this.employeeService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }
  onEdit(row){
    this.employeeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }
  onDelete($key) {
    // if(confirm('Are you sure to delete this recrd ?')) {
    //   this.employeeService.deleteEmployee($key);
    //   this.notificationService.warn('! Deleted successfully');
    // }
    this.dialogService.openConfirDialog('Are you sure to delete this record ?').afterClosed().subscribe(res=>
      {
        if(res) {
          this.employeeService.deleteEmployee($key);
          this.notificationService.warn('! Deleted successfully');
        }
      });
  }
}

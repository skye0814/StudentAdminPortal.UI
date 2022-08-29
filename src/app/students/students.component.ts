import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  // Student model
  students: Student[] = [];
  // MatTable Columns
  displayedColumns : string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'phoneNumber', 'gender', 'edit'];
  // MatTable Data Source
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  // Table Paginator
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  // Sorting table
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    // Fetch students
    this.studentService.getStudents()
    .subscribe(
      successResponse => {
        // console.log(successResponse);
        this.students = successResponse;
        this.dataSource = new MatTableDataSource<Student>(this.students);

        if (this.matPaginator){
          this.dataSource.paginator = this.matPaginator;
        }
        if (this.matSort){
          this.dataSource.sort = this.matSort;
        }
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );
  }

  filterStudents(){
    if(this.dataSource){
      this.dataSource.filter = this.filterString.trim().toLowerCase();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Gender } from 'src/app/models/gender.model';
import { Student } from 'src/app/models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined; // student string variable
  studentModel: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: 0,
    profileImageUrl: '',
    genderId: '',
    gender: {
      genderId: '',
      description: ''
    },
    address: {
      addressId: '',
      physicalAddress: '',
      postalAddress: '',
      studentId: ''
    }
  };
  genderList: Gender[] = [];
  isNewStudent = true;
  header = '';

  constructor(private studentService: StudentService,
    private genderService: GenderService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    // get the value of id from the route
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('studentId'); // assign the id from the route to the student variable

        // if it is not null
        if(this.studentId)
        {
          if(this.studentId?.toLowerCase() == 'add-student'.toLocaleLowerCase()){
            this.isNewStudent = true;
            this.header = 'Add Student';

            this.genderService.getGenderList()
            .subscribe({
                next: (data) => {
                  console.log(data);
                  this.genderList = data;
                },
                error: console.error
            });
          }
          else{
            this.isNewStudent = false;
            this.header = 'Edit Student'

            this.studentService.getStudent(this.studentId)
            .subscribe({
                next: (data) => {
                  this.studentModel = data;
                  console.log(data);
                },
                error: console.error
            });

            this.genderService.getGenderList()
            .subscribe({
                next: (data) => {
                  console.log(data);
                  this.genderList = data;
                },
                error: console.error
            });
          }
        }
      }
    );
  }

  deleteStudent(): void {
    this.route.paramMap.subscribe(param => {
      this.studentId = param.get('studentId');

      if (this.studentId){
        this.studentService.deleteStudent(this.studentId).subscribe({
          next: (data) => {
            this.snackbar.open("Deleted successfully", undefined, {duration: 2000});
            this.router.navigateByUrl('students');
          },
          error: (error) => {
            this.snackbar.open(error, undefined, {duration: 2000});
          }
        });
      }
    });
  }

  insertStudent(): void {

  }

  updateStudent(): void{
    this.studentService.updateStudent(this.studentModel.id, this.studentModel)
    .subscribe({
        next: () => {
          this.snackbar.open("Updated successfully", undefined, {
            duration: 2000
          });
        },
        error: () => {
          this.snackbar.open("There was an error occurred. Update failed.", undefined, {
            duration: 2000
          });
        }
    });

  }
}

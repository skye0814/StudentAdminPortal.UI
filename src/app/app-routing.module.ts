import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { ViewStudentComponent } from './students/view-student/view-student.component';

const routes: Routes = [
  {
    // home route
    path: '',
    component: StudentsComponent
  },
  {
    // students route
    path: 'students',
    component: StudentsComponent
  },
  {
    // view student route
    path: 'students/:studentId',
    component: ViewStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

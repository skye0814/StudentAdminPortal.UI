import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student, UpdateStudentWebRequest } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:44382';

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students');
  }

  getStudent(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/students/' + studentId);
  }

  deleteStudent(studentId: string): Observable<Student>{
    return this.httpClient.delete<Student>(this.baseApiUrl + '/students/' + studentId);
  }

  updateStudent(studentId: string, studentModelRequest: Student): Observable<Student>{
    const UpdateStudentWebRequest: UpdateStudentWebRequest = {
      firstName: studentModelRequest.firstName,
      lastName: studentModelRequest.lastName,
      dateOfBirth: studentModelRequest.dateOfBirth,
      email: studentModelRequest.email,
      phoneNumber: studentModelRequest.phoneNumber,
      genderId: studentModelRequest.genderId,
      physicalAddress: studentModelRequest.address.physicalAddress,
      postalAddress: studentModelRequest.address.postalAddress
    }

    return this.httpClient.put<Student>(this.baseApiUrl + '/students/' + studentId, UpdateStudentWebRequest);
  }
}

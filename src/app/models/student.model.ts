import { Address } from "./address.model";
import { Gender } from "./gender.model";

export interface Student{
  id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
  phoneNumber: number,
  profileImageUrl: string,
  genderId: string,
  gender: Gender,
  address: Address
}

export interface UpdateStudentWebRequest{
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
  phoneNumber: number,
  genderId: string,
  physicalAddress: string,
  postalAddress: string
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  FormBuilder,  Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../student.service';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:4000/api/upload';


@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})

export class StudentAddComponent implements OnInit {

  angForm: FormGroup;
  control = new FormControl('');
  studentDepartment: Array<String> = ['Civil', 'IT', 'Computer'];
  studentHobbies: Array<String> = ['Cricket', 'Reading', 'Football', 'Tenis'];
  selectedHobbies = [];
  studentHobbiesError: Boolean = true;
  profilPhotos;
  studentEmailcheck: any = {};
  emailAlredyExist = "";
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  
  constructor(private fb: FormBuilder, private http: HttpClient, private ss: StudentService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      s_name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')] ],
      s_email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')] ],
      s_phone: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)] ],
      s_department: [null, Validators.required ],
      s_profile: ['', Validators.required],
      s_gender: ['male', Validators.required],
      s_hobbie: this.addHobbies()
    });
  }

  addHobbies() {
    const hobbieArrays = this.studentHobbies.map(element => {
      return this.fb.control(false);
    });
    return this.fb.array(hobbieArrays);
  }

  get hobbiesArray() {
    return <FormArray>this.angForm.get('s_hobbie');
  }

  getSelectedHobbies() {
    this.selectedHobbies = [];
    this.hobbiesArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedHobbies.push(this.studentHobbies[i]);
      }
    });
    this.studentHobbiesError = this.selectedHobbies.length > 0 ? false : true;
    //console.log(this.selectedHobbies);
  }

  checkHobbiesTouched() {
    let flg = false;
    this.hobbiesArray.controls.forEach((control) => {
      if (control.touched){
        flg = true;
      }
    });
    return flg;
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //console.log('ImageUpload:uploaded:', item, status, response);
      console.log(response);
      this.profilPhotos = response;
    };
  }

  addStudentInfo(s_name, s_email, s_phone, s_department) {
    const newHobbie = this.selectedHobbies;
    this.ss.addStudent(s_name, s_email, s_phone, s_department, this.profilPhotos, this.angForm.controls['s_gender'].value, newHobbie);
    // console.log(this.angForm);
    // const newHobbie = this.selectedHobbies;
    // if (this.angForm.valid && !this.studentHobbiesError) {
    //   console.log({...this.angForm.value, newHobbie});
    // }  
  }

  emailCheckUnique() {
    this.ss.emailCheckUnique(this.angForm.controls['s_email'].value).subscribe(res => {
      this.studentEmailcheck = res;
      if (this.studentEmailcheck.length > 0) {
        this.emailAlredyExist = "Email Alredy Exist";
      }
      else{
        this.emailAlredyExist = "";
      }
    });
  }
}

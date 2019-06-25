import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  uri = 'http://localhost:4000/student';

  constructor(private http: HttpClient, private router: Router) { }
  
  addStudent(s_name, s_email, s_phone, s_department, s_profile, s_gender, s_hobbie) {
    const obj = {
      s_name: s_name,
      s_email: s_email,
      s_phone: s_phone,
      s_department: s_department,
      s_profile: s_profile,
      s_gender: s_gender,
      s_hobbie: s_hobbie
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => this.router.navigate(['/student']));
  }
  
  getBusinesses() {
    return this
           .http
           .get(`${this.uri}`);
  }
  emailCheckUnique(email) {
    return this
              .http
              .get(`${this.uri}/email/${email}`);
  }
}

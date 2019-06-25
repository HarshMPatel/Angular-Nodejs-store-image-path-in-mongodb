import { Component, OnInit } from '@angular/core';
import Student from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-get',
  templateUrl: './student-get.component.html',
  styleUrls: ['./student-get.component.css']
})
export class StudentGetComponent implements OnInit {

  students: Student[];

  constructor(private ss: StudentService) { }

  ngOnInit() {
    this.ss
    .getBusinesses()
    .subscribe((data: Student[]) => {
      this.students = data;
  });
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentGetComponent } from './student-get/student-get.component';

const routes: Routes = [
  {
    path: 'student/create',
    component: StudentAddComponent
  },
  {
    path: 'student/edit/:id',
    component: StudentEditComponent
  },
  {
    path: 'student',
    component: StudentGetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public formStudent: FormGroup;
  students: any = [];
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formStudent = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        genre: ["", [Validators.required, this.validationCustom]],
        aula: this.formBuilder.array([])
      }
    )
  }

  validationCustom(control: AbstractControl){
    const genre = control.value;
    let error = null;
    if (genre == "") {
      error = { error: 'Genero no permitido' };
    }
    return error
  }

  generateField() {
    (this.formStudent.get('aula') as FormArray).push(
      this.formBuilder.control("", Validators.required)
    );
  }

  send() {
    this.students.push(this.formStudent.value);
    this.formStudent.reset();
    (this.formStudent.get('aula') as FormArray).clear();
  }

  get aulas():FormArray {
    return this.formStudent.get('aula') as FormArray
  }

  removeField(index: number, all?:boolean) {
    const aulas = (this.formStudent.get('aula') as FormArray);
    if (aulas.length){
      aulas.removeAt(index)
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { AlertyfyService } from 'src/app/services/alertyfy.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

 registrationForm: FormGroup;
 user: User;
 userSubmitted: boolean
 constructor(private fb: FormBuilder, private userService: UserService, private alertyfyservice: AlertyfyService){}

 ngOnInit() {
  //  this.registrationForm = new FormGroup({
  //  userName: new FormControl(null,Validators.required),
  //  email: new FormControl(null,[Validators.email,Validators.required]),
  //  password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
  //  confirmPassword: new FormControl(null,[Validators.required]),
  //  mobile: new FormControl(null,[Validators.required, Validators.maxLength(10)]),
  //  },this.passwordMatchingValidator);
  this.createRegistrationForm();
 }

 createRegistrationForm(){
  this.registrationForm = this.fb.group({
    userName: [null,Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null,[Validators.required, Validators.minLength(8)]],
    confirmPassword: [null,Validators.required],
    mobile: [null,[Validators.required, Validators.maxLength(10)]]
  },{Validators: this.passwordMatchingValidator});
 }

 passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
  return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null :
    { notmatched: true }
};

 onSubmit(){
  console.log(this.registrationForm.value)
  this.userSubmitted = true;
  if(this.registrationForm.valid){
   // this.user = Object.assign(this.user, this.registrationForm.value)
    this.userService.addUser(this.userData());
    this.registrationForm.reset();
    this.userSubmitted = false;
    this.alertyfyservice.success("Congrats, you have succesfully registered")
  }
  else{
    this.alertyfyservice.error("Kindly provide the required fields")
  }

 }

 userData(): User{
  return this.user = {
    userName: this.userName.value,
    email: this.email.value,
    password: this.password.value,
    mobile: this.mobile.value,
  }
 }

 get userName(){
  return this.registrationForm.get('userName') as FormControl;
 }

 get email(){
  return this.registrationForm.get('email') as FormControl;
 }
 get password(){
  return this.registrationForm.get('password') as FormControl;
 }
 get confirmPassword(){
  return this.registrationForm.get('confirmPassword') as FormControl;
 }

 get mobile(){
  return this.registrationForm.get('mobile') as FormControl;
 }





}

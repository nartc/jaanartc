import {Component, OnInit} from '@angular/core';
import {BaseForm} from '../../utilities/BaseForm';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterParams} from '../../swagger-api/model/registerParams';
import {AuthService} from '../../services/auth.service';
import {RegisterResponse} from '../../swagger-api/model/registerResponse';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseForm implements OnInit {

    form: FormGroup;

    userName: FormControl;
    fullName: FormControl;
    password: FormControl;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService) {
        super();
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.form = this.formBuilder.group({
            userName: ['', Validators.compose([
                Validators.required,
                Validators.minLength(6)
            ])],
            fullName: [''],
            password: ['', Validators.required]
        });
        this.exposeControls();
    }

    submit() {
        const newUser: RegisterParams = {
            userName: this.userName.value,
            fullName: this.fullName.value,
            password: this.password.value
        };

        this.authService.registerUser(newUser).subscribe((value: RegisterResponse) => {
            this.form.reset();
            console.log(value);
        });
    }

}

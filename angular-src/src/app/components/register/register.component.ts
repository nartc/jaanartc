import {Component, OnInit} from '@angular/core';
import {BaseForm} from '../../utilities/BaseForm';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseForm implements OnInit {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) {
        super();
    }

    ngOnInit() {
    }

    initForm() {

    }

    submit() {

    }

}

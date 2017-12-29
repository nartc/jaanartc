import {FormArray, FormControl, FormGroup} from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';

export abstract class BaseForm {
    form: FormGroup;
    isInitialized: boolean;
    isPopulating = false;
    _model: any = {};
    disabled = false;

    constructor() {

    }

    /**
     * Initialize controls.
     */
    abstract initForm(): void;

    /**
     * Dynamically exposes form.controls
     * TODO: write an example
     */
    protected exposeControls() {
        _.each(this.form.controls, (control: FormControl, controlName: string): void => {
            if (control instanceof FormGroup) {
                _.each(control.controls, (childControl: FormControl, childControlName: string): void => {
                    this[childControlName] = childControl;
                });
            } else if (control instanceof FormControl) {
                this[controlName] = control;
            } else {
                console.log(control);
            }
        });
    }

    isChanged(): boolean {
        const formValue = this.value;
        return Object.keys(formValue).some((key) => {

            if (this._model.hasOwnProperty(key) && this._model[key] !== formValue[key]) {
                // console.log(this._model[key], 'this.model[key]', key);
                // console.log(formValue[key], 'formValue[key]');
            }
            return this._model.hasOwnProperty(key) && this._model[key] !== formValue[key];
        });
    }

    /**
     * Returns all form values (including disabled fields)
     */
    getAllValues(options?: { excludeNulls: boolean }) {
        const obj: any = {};
        Object.keys(this.form.controls)
            .filter((key) => (options && options.excludeNulls) ? this.form.controls[key].value !== null : true)
            .forEach((key) => obj[key] = this.form.controls[key].value);
        return obj;

    }

    /**
     * Populates the form controls using the provided `data` object.
     * Note: Undefined values are ignored
     * @param {Object} data - a key value pair object matching the control names.
     */
    public populate(data: any) {
        if (!data) throw Error('You called form.populate with an invalid object');
        this.isPopulating = true;
        const formFields = data;
        this._model = data;
        _.each(this.form.controls, (control: FormControl, controlName: string): void => {
            const value = formFields[controlName];
            if (!_.isUndefined(value)) {
                control.setValue(formFields[controlName], {
                    onlySelf: false,
                    emitEvent: true,
                    emitModelToViewChange: true,
                    emitViewToModelChange: true
                });
                control.updateValueAndValidity();
            }
        });
        this.isPopulating = false;
    }

    populateDate(formControlName: string, value: any, format = 'L') {
        const date = moment(value);
        date.toString = () => date.format(format);
        this.form.controls[formControlName].setValue(date);
    }

    public populatePartial(data: any) {
        delete data.id;
        this.populate(Object.assign(this._model || {}, data));
    }

    /**
     * Marks all form controls as touched.
     */
    protected markAsTouched(): void {
        // TODO: use form.markAsTouched() once its fixed by angular
        // this.form.markAsTouched();
        _.each(this.form.controls, (control: FormControl): void => control.markAsTouched({onlySelf: false}));
    }

    protected markAsUntouched(): void {
        // TODO: use form.markAsTouched() once its fixed by angular
        _.each(this.form.controls, (control: FormControl): void => control.markAsUntouched({onlySelf: false}));
    }

    public updateValueAndValidity(): void {
        this.form.updateValueAndValidity({onlySelf: false, emitEvent: true});
        _.each(this.form.controls, (control: FormControl): void => control.updateValueAndValidity({
            onlySelf: false,
            emitEvent: true
        }));
    }

    public disable() {
        this.disabled = true;
        Object.keys(this.form.controls).forEach((key) => this.form.controls[key].disable());
    }

    get enabled() {
        return !this.disabled;
    }

    public enable() {
        this.disabled = false;
        Object.keys(this.form.controls).forEach((key) => this.form.controls[key].enable());
    }


    isValid() {
        // workaround angular bug
        if (this.form.valid === false && this.form.errors)
            return false;

        const errors = Object.keys(this.form.controls)
            .map(key => {
                if (this.form.controls[key].errors) {
                    return {[key]: this.form.controls[key].errors};
                } else {
                    return null;
                }
            })
            .filter(error => error != null);
        if (errors.length) {
            console.log('errors', errors);
        }
        return errors.length === 0;
    }

    get value(): any {
        return Object.assign({}, this._model || {}, this.nullify(this.form.value));
    }

    /**
     * Turns string nulls to null
     * @param obj
     */
    nullify(obj: any) {
        if (typeof obj === 'string') {
            return (obj === 'null') ? null : obj;
        }
        // TODO: remove this method when ngModel is fixed...
        _.each(obj, (value, key) => {
            if (value === 'null') {
                obj[key] = null;
            }
        });
        return obj;
    }

    // TODO: return a observable instead of providing a callback method
    abstract submit(callback?): any

    /**
     * Returns a JSON string representing the current model.
     * Useful for observing the form model
     * Usage:
     *  <pre>{{ debug }}</pre>
     * @returns {string}
     */
    get debug() {
        return JSON.stringify(this.form.value, null, 2)
    }

    get debugErrors() {
        return JSON.stringify(this.errors, null, 2)
    }

    get errors() {
        // ng2 bug: form.errors doesn't work.
        // return this.form.errors;
        return Object.keys(this.form.controls)
            .reduce((obj, name) => {
                obj[name] = this.form.controls[name].errors;
                return obj;
            }, {form: this.form.errors})
    }
}

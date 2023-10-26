import { FormArray, FormGroup } from '@angular/forms';

export function getFormControl(form: FormGroup, name: string) {
    return form.get(name)!;
}

export function getItems(form: FormGroup, name: string) {
    return (getFormControl(form, name) as FormArray<FormGroup>);
}

export function getItemDetail(form: FormGroup, idx: number, name: string): any {
    let items = getItems(form, name);
    return items?.get(`${idx}.${name}`)
}

export function checkInvalid(form: FormGroup, name: string): boolean {
    const theForm = getFormControl(form, name)
    return theForm.dirty || theForm.touched && theForm.invalid
}

export function checkInvalidItem(form: FormGroup, idx: number, name: string): any {
    const items = getItems(form, name)
    return items?.get(`${idx}.${name}`)?.dirty || items?.get(`${idx}.${name}`)?.touched && items?.get(`${idx}.${name}`)?.invalid
}
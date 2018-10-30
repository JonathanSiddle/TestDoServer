import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function existsInListValidator(values: Array<string>): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

        const trimmedInput = values.map(s => s.trim());
        const input = control.value as string;
        if (input == null) {
            return null;
        }
        if (trimmedInput.includes(input.trim())) {
            return {'alreadyExists' : true};
        }

        return null;
    }
}
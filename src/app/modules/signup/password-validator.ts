
import { AbstractControl } from "@angular/forms";

export class PasswordValidator{

    static match(form: AbstractControl) {
        const Password = form.get('password')?.value;
        const ConfirmPassword = form.get('confirmPassword')?.value;

        if (Password !== ConfirmPassword) {
            return { match: { Password, ConfirmPassword } }
        }
        else
            return null;
    }
}
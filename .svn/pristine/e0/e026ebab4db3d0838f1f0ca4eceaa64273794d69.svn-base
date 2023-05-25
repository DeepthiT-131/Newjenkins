import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NoWhitespaceValidator
{

  static cannotContainSpace(control: AbstractControl): ValidationErrors |null
  {
    if (control && control.value && !control.value.replace(/\s/g, '').length)
    {
      
      if((control.value as string).indexOf(' ')>=0)
      
          return {cannotContainSpace:true}
          return null;
    }
    return null;
  }
}
 
import{ FormGroup,FormArray, AbstractControl} from '@angular/forms'

export function WholeNumber(control:AbstractControl){
   if(control.value!=null){
      if(parseInt(control.value)<1){
          return {wholeNumber:true}
      }
      else{
          return null;
      }
   }
   else{
        return null;
   }
}
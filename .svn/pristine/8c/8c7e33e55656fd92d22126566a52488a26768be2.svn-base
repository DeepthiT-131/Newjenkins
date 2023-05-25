import{ FormGroup,FormArray, AbstractControl} from '@angular/forms'

export function MinValue(control:AbstractControl){
   if(control.value!=null){
      if(parseInt(control.value)<0){
        return {minValue:true}
      }
      else{
          return null;
      }
   }
   else{
        return null;
   }
}
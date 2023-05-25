import{  AbstractControl} from '@angular/forms'

export function Dropdown(control:AbstractControl){
   if(control.value==0 || control.value==null){
    return {defaultSelect:true}
   }
   else{
        return null;
   }
}
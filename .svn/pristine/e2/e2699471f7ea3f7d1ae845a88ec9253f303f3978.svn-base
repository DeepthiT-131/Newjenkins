import{ FormGroup,FormArray, AbstractControl} from '@angular/forms'

export function CompareDate(fromDateCrl:string,toDateCrl:string){
    return (formGroup:FormGroup)=>{
        let fromControl=formGroup.controls[fromDateCrl];
        let toControl=formGroup.controls[toDateCrl];
        let fromDate = new Date(formGroup.controls[fromDateCrl].value);
        fromDate.setHours(0,0,0,0);
        let toDate =  new Date(formGroup.controls[toDateCrl].value);
        toDate.setHours(0,0,0,0);
        if(toControl.hasError('required') || fromControl.hasError('required')){
            return;
        }
        if(fromDate<=toDate){
            formGroup.controls[toDateCrl].setErrors(null);
        }
        else if(fromDate>toDate){
            formGroup.controls[toDateCrl].setErrors({dateError:true});
        }
    }
}
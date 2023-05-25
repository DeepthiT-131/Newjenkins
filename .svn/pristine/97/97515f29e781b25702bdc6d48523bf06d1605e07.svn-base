import { FormGroup, FormArray } from '@angular/forms';

// custom validator to check that two fields match
export function CompareQuantity(availQty: string, formArray: string) {
    return (formGroup: FormGroup) => {
        let availcontrol = formGroup.controls[availQty];
        let availQuantity=availcontrol.value==null?0:availcontrol.value;
        let availUomControl = formGroup.controls['availUom'];
        let availUom=availUomControl.value==null?'':availUomControl.value;
        let dynControl = formGroup.controls[formArray] as FormArray;
        let sumCount =0;
        let arr=[];
        let isRepeatLoc:boolean=false;
        let convCsValue= formGroup.controls['convCsValue'].value==null?0:formGroup.controls['convCsValue'].value;
        let convInValue= formGroup.controls['convInValue'].value==null?0:formGroup.controls['convInValue'].value;
        if (availcontrol.errors  && dynControl.errors) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        for(let i=0;i<dynControl.length;i++){
            let formGroup= dynControl.controls[i].value as FormGroup;
            let val=formGroup['toLocation'] +''+formGroup['toArea']
            if(formGroup['toLocation']!=''){
           if( arr.indexOf(val)>-1){
              isRepeatLoc=true;
           }
           else{
                arr.push(val);
           }
        }
           
           if(formGroup['pickUom']=='PCS'){
            sumCount=sumCount+ parseInt(formGroup['pickQty']);
           }
           else if(formGroup['pickUom']=='CS'){
            let val= parseInt(formGroup['pickQty'])*(convCsValue==null || convCsValue==0?1:convCsValue);
            sumCount=sumCount+ val;
           }
           else if(formGroup['pickUom']=='IN'){
            let val= parseInt(formGroup['pickQty'])*(convInValue==null || convInValue==0?1:convInValue);
            sumCount=sumCount+ val;
           }
           //sumCount=sumCount+ parseInt(formGroup['pickQty']);
        }

        
        if(availUom=='CS'){
            availQuantity * (convCsValue==null || convCsValue==0?1:convCsValue);
        }
        else if(availUom=='IN'){
            availQuantity * (convInValue==null || convInValue==0?1:convInValue);
        }
        let convAvailQty = availcontrol.value

        if(isRepeatLoc && availQuantity < sumCount){
            dynControl.setErrors({ repeatLocation: true, exceedQty: true,notMatch: true  });
        }
        else if(isRepeatLoc){
            dynControl.setErrors({ repeatLocation: true });
        }
        else if(availQuantity < sumCount){
            dynControl.setErrors({ exceedQty: true });
        }
        else{
            dynControl.setErrors(null);
        }
        

       
    }
}
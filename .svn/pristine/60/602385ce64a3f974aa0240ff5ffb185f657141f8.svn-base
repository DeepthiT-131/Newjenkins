import {FormGroup, FormArray } from '@angular/forms'

export function CompareQuantityReceive(){
    return (formGroup:FormGroup)=>{
        let isSumExceed:boolean=false;
        let expQty = formGroup.controls['expQty'].value==null?0:formGroup.controls['expQty'].value;
        //let expecUom=formGroup.controls['expUom'].value==null?'':formGroup.controls['expUom'].value;
        let adjQty = formGroup.controls['shortageAdjust'].value==null?0:formGroup.controls['shortageAdjust'].value;
        //let adjUom=formGroup.controls['uom'].value==null?'':formGroup.controls['uom'].value;//this.receive.uom.value;
        let damQty = formGroup.controls['damageAdjust'].value==null?0:formGroup.controls['damageAdjust'].value;//this.receive.damageAdjust.value;
        
        if(adjQty<0){
            formGroup.controls['shortageAdjust'].setErrors({minError:true});
        }
        else{
            formGroup.controls['shortageAdjust'].setErrors(null);
        }
        if(damQty<0){
            formGroup.controls['damageAdjust'].setErrors({minError:true});
        }
        else{
            formGroup.controls['damageAdjust'].setErrors(null);
        }
        // if(damUom!='' && damQty>0 && (damQty>expQty || isSumExceed==true)){
        //     formGroup.controls['damageAdjust'].setErrors({qtyExceed:true});
        // }else{
        //     formGroup.controls['damageAdjust'].setErrors(null);
        // }
    }
}
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'splitValue'
  })
  export class SplitValuePipe implements PipeTransform {
    transform(val:string):string {
      //  alert(val)
      if(val!=null && val!=undefined && val!="")
      {
       let firstCommaIndex = val.indexOf('_');
       
    //    let firstPart = val.substring(0, firstCommaIndex); //101
       let secondPart = val.substring(firstCommaIndex + 1); //a,b,c,d
    
      return secondPart;
      }
   
    }
  }
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";

export class CustomValidators{

  static minLength(control: FormControl): { [s: string]: boolean }{
    if(control.value){
      if(control.value.length < 10){
        return {'lengthInvalid': true}
      }
    }
    return {'lengthInvalid': false};
  }

  static asyncInvalidLength(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value.length < 10){
          resolve({'lengthInvalid': true});
        }else{
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }
}

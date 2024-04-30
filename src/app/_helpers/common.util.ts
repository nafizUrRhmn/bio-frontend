
export class CommonUtil{
 static classInitializer(value){
    if(value?.pristine){
      return '';
    } else if(value?.invalid){
      return 'is-invalid';
    }else if(value?.valid){
      return 'is-valid'
    }else{
      return '';
    }
  }

}

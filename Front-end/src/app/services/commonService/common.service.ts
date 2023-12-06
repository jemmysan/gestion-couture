import { Injectable } from '@angular/core';
import { uri } from 'src/app/environments/uri-environment';
import { apiUrlEnv } from 'src/app/environments/apiurl-environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiUrl = apiUrlEnv.apiUrl;
  uriOrderNum = uri.uriNumOrder;

  constructor(private httpClient : HttpClient) { }

  createReference(libelle: any, categorie : any,code :any) : string
  {
      let prefix = uri.prefixRef
      let lib = libelle.slice(0,3);
      let getRef = prefix+'-'+lib;
      if(categorie != null){
        let cat = categorie.slice(0,3);
        let setRef = prefix+'-'+lib+'-'+cat+'-'+code;
        let refToUpper = setRef.toUpperCase();
        return refToUpper;
      }
      else{
          return getRef.toUpperCase();
      }
  }

  getNumOrder(model : string, idCategorie : number):Observable<any>{
      return this.httpClient.get(this.apiUrl+this.uriOrderNum+'/'+model+'/'+idCategorie)
  }

  getAskedValue($value : number):number{
    let randomOffset = (Math.random() - 0.5) / 5;
    let newValue = $value+randomOffset;
    return Math.round(newValue);
  }
}

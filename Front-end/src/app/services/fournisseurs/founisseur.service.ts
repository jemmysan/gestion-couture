import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlEnv } from 'src/app/environments/apiurl-environment';
import { uri } from 'src/app/environments/uri-environment';
import { Ifournisseur } from 'src/app/interfaces/idata';


@Injectable({
  providedIn: 'root'
})
export class FounisseurService {

  apiUrl = apiUrlEnv.apiUrl;
  uriFour = uri.uriFour;

  constructor(private http : HttpClient) { }

  findFournisseur(body : any) :Observable<any>
  {
    return this.http.post(this.apiUrl+this.uriFour,body);
  }
}

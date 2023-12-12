import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrlEnv } from 'src/app/environments/apiurl-environment';
import { uriCat } from 'src/app/environments/uri-environment';
import { ICategorie } from 'src/app/interfaces/idata';

@Injectable({
  providedIn: 'root'
})

export class CategorieService {
  apiUrl = apiUrlEnv.apiUrl;
  uriListCat = uriCat.ListCategorie;
  uriAddCat = uriCat.addCategorie;

  constructor(private httpClient : HttpClient) { }

  displayCategorie($nbrPage : number) : Observable<any>
  {
      return this.httpClient.get(this.apiUrl+this.uriListCat+$nbrPage)
  }

  addCategorie(categorie : ICategorie ) : Observable<ICategorie>{
    return this.httpClient.post<ICategorie>(this.apiUrl+this.uriAddCat,categorie)
  }
}

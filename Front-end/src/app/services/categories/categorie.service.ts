import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrlEnv } from 'src/app/environments/apiurl-environment';
import { uriCategorie } from 'src/app/environments/uri-environment';
import { ICategorie } from 'src/app/interfaces/idata';

@Injectable({
  providedIn: 'root'
})

export class CategorieService {
  apiUrl = apiUrlEnv.apiUrl;
  uriListCat = uriCategorie.ListCategorie;
  uriAddCat = uriCategorie.addCategorie;
  uriUpdateCat = uriCategorie.updateCategorie;
  uriDeleteCat = uriCategorie.deleteCategorie;

  constructor(private httpClient : HttpClient) { }

  displayCategorie() : Observable<any>
  {
      return this.httpClient.get(this.apiUrl+this.uriListCat)
  }

  addCategorie(categorie : ICategorie ) : Observable<ICategorie>{
    return this.httpClient.post<ICategorie>(this.apiUrl+this.uriAddCat,categorie);
  }

  updateCategorie(categorie : ICategorie,id : number) : Observable<ICategorie>{
    return this.httpClient.put<ICategorie>(this.apiUrl+this.uriUpdateCat+id,categorie)
  }

  deleteCategorie(categorie : any) : Observable<ICategorie>{
    return this.httpClient.post<ICategorie>(this.apiUrl+this.uriDeleteCat,categorie)
  }
}

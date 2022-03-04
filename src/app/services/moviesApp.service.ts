import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesAppService {

  private routeParams: any;
  private baseUri = environment.apiUrlBase;
  private api_key = environment.api_key;
  private headers: Headers;

  constructor(private http: HttpClient) {
    this.headers = new Headers({
      // 'Authorization': 'Bearer ' + this.oAuthService.getAccessToken()
    });
  }

  public getMovies(searchText: String): Observable<any> {
    return this.http.get(
        this.baseUri + `/search/movie?api_key=${this.api_key}&query=` + searchText
    ).pipe(map(
        (res: any) => {
            return res;
        }
    ));
}
}

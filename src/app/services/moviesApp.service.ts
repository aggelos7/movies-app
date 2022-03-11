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

  public getMovies(searchText: string): Observable<any> {
    return this.http.get(
      this.baseUri + `/search/movie?api_key=${this.api_key}&query=` + searchText
    ).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }

  public fetchDetails(movieID: number): Observable<any> {
    return this.http.get(
      this.baseUri + `/movie/${movieID}?api_key=${this.api_key}&language=en-US`
    ).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }

  public getGuestSession(): Observable<any> {
    return this.http.get(
      this.baseUri + `/authentication/guest_session/new?api_key=${this.api_key}`
    ).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }

  public postRate(movieID: number, rateInput: number, guest_session_id: string): Observable<any> {
    return this.http.post(
      this.baseUri + `/movie/${movieID}/rating?api_key=${this.api_key}&guest_session_id=${guest_session_id}`, 
      {
        'value' : rateInput
      }
    ).pipe(map(
        (res: any) => {
            return res;
        }
    ));      
}
}

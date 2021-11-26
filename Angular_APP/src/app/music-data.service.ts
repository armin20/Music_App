import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {


  // private favouritesList: Array<any> = [];

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient, private Auth: AuthService) { }  

  getNewReleases(): Observable<any> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases",
         { headers: { "Authorization": `Bearer ${token}` }
         }
        );
      })
    );
  }

  getArtistById(id: any): Observable<any>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`,
       { headers: { "Authorization": `Bearer ${token}` } 
       }
      );
    })
   );
  }

  getAlbumsByArtistId(id: any): Observable<any>{
    const includeGroups = 'album,single';
    const limit = 50;

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=${includeGroups}&limit=${limit}`,
       { headers: { "Authorization": `Bearer ${token}` }
      }
      );
    })
    );
  }

  getAlbumById(id: any): Observable<any>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{      
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`,
       { headers: { "Authorization": `Bearer ${token}` }
       }
      );
    })
    );
  }

  searchArtists(searchString: any): Observable<any>{
    const q = searchString;
    const type = 'artist';
    const limit = 50;

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=${limit}`,
       { headers: { "Authorization": `Bearer ${token}` } 
       }
      );
    })
   );
  }


  addToFavourites(id:string): Observable<any> {

    let token = this.Auth.isAuthenticated();
    let t1 = this.Auth.readToken();
    let getT = this.Auth.getToken();
    console.log(token);
    console.log(getT);
    

    
    
    return this.http.put<any>(`${environment.userAPIBase}/favourites/${id}`, { headers: { "Authorization": `Bearer ${t1}` } 
  });
  }
  
  removeFromFavourites(id:string): Observable<any> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
      let removedFavourites = favouritesArray.indexOf(id);
      console.log(removedFavourites);
      
      favouritesArray.splice(removedFavourites, 1);
      return this.getFavourites();
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
    }));
  }
  
  getFavourites(): Observable<any> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`).pipe(mergeMap(favouritesArray => {
      if(favouritesArray.length > 0){
        const ids = favouritesArray.join(',');
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${ids}`,
           { headers: { "Authorization": `Bearer ${token}` } 
           }
          );
        })
       );
      }
      else{  
      return new Observable(o=>{o.next({tracks: []})});
      }
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
    }));
  }
  // addToFavourites(id: any): boolean{

  //   if((id !== null || id !== undefined) && this.favouritesList.length >= 50){
  //     return false;
  //   }
  //   else{
  //     this.favouritesList.push(id);
  //     return true;
  //   }
  // }

  // removeFromFavourites(id: any): Observable<any>{
  //   this.favouritesList.splice(this.favouritesList.indexOf(id), 1);
  //   return this.getFavourites();
  // }
  
  // getFavourites(): Observable<any> {
  //   if(this.favouritesList.length > 0){
  //     const ids = this.favouritesList.join(',');
  //     return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
  //       return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${ids}`,
  //        { headers: { "Authorization": `Bearer ${token}` } 
  //        }
  //       );
  //     })
  //    );
  //   }
  //   else{  
  //   return new Observable(o=>{o.next([])});
  //   }
  // }
}
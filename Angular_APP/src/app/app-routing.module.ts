import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponentComponent } from './view/about-component/about-component.component';
import { AlbumComponentComponent } from './view/album-component/album-component.component';
import { ArtistDiscographyComponentComponent } from './view/artist-discography-component/artist-discography-component.component';
import { NewReleasesComponentComponent } from './view/new-releases-component/new-releases-component.component';
import { NotFoundComponentComponent } from './view/not-found-component/not-found-component.component';
import { SearchResultComponent } from './search-result/search-result.component';
import {FavouritesComponent} from './favourites/favourites.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GuardAuthService } from './guard-auth.service';

const routes: Routes = [
  {path: 'about', component: AboutComponentComponent, canActivate: [GuardAuthService]},
  {path: 'newReleases',   component: NewReleasesComponentComponent, canActivate: [GuardAuthService]},
  {path: 'album/:id', component: AlbumComponentComponent, canActivate: [GuardAuthService]},
  {path: 'artist/:id', component: ArtistDiscographyComponentComponent, canActivate: [GuardAuthService]},
  {path: "search", component: SearchResultComponent, canActivate: [GuardAuthService]},
  {path: "favourites", component: FavouritesComponent, canActivate: [GuardAuthService] },
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: '', redirectTo: 'newReleases', pathMatch: 'full'},
  {path: '**', component: NotFoundComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

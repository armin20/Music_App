import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites: Array<any> = [];
  sub: any;
  removeFavourite: any;

  constructor(private dataService: MusicDataService, private snackBar: MatSnackBar) { }


  removeFromFavourites(id: any): void{
    this.removeFavourite = this.dataService.removeFromFavourites(id).subscribe(data=>this.favourites = data.tracks);
   
    //The line below shows whenever the user click on the music queue for deleting the music from favourites.
    if(this.removeFavourite){
      this.snackBar.open("Done...", "", {duration: 1500});
    }
  }

  ngOnInit(): void {
    
    this.sub = this.dataService.getFavourites().subscribe(data=>{
      this.favourites = data.tracks;
    });
  }

  ngOnDestroy(): void{
    this.sub?.unsubscribe();
    this.removeFavourite?.unsubscribe();
  }
}

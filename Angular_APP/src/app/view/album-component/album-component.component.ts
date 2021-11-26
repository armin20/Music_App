import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from 'src/app/music-data.service';

@Component({
  selector: 'app-album-component',
  templateUrl: './album-component.component.html',
  styleUrls: ['./album-component.component.css']
})
  
export class AlbumComponentComponent implements OnInit, OnDestroy {
  album: any;
  ids: any;
  albumSubscribed: any;

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private musicData: MusicDataService) { }

  
  ngOnInit(): void {
    this.ids = this.route.params.subscribe(params=>{
      this.albumSubscribed = this.musicData.getAlbumById(params.id).subscribe(data=>this.album = data)
    });
  }
  
  addToFavourites(trackID: any): void{
    console.log(trackID);
    
    this.musicData.addToFavourites(trackID).subscribe((data)=>{
   
      if(data){
        this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
      }
      
    }, (error)=>{
      this.snackBar.open("Unable to add to Favourites", "Done", { duration: 1500 });

    })
    // let flag = this.musicData.addToFavourites(trackID);
    // if(flag){
    //   this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    // }
    // else{
    //   this.snackBar.open("Unable to Add to Favourites", "Done", { duration: 1500 });
    // }
  }

  ngOnDestroy(): void{
    this.ids?.unsubscribe();
    this.albumSubscribed?.unsubscribe();
  }
}

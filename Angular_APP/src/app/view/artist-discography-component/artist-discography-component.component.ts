import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../../music-data.service';
@Component({
  selector: 'app-artist-discography-component',
  templateUrl: './artist-discography-component.component.html',
  styleUrls: ['./artist-discography-component.component.css']
})
export class ArtistDiscographyComponentComponent implements OnInit {

  albums: any; 
  artists: any;
  private albumSubscribe: any;
  private sub: any;

  constructor(private route: ActivatedRoute,
    private MusicData: MusicDataService) {  }


  ngOnInit(): void {

    let id = this.route.snapshot.params['id'];

    this.sub = this.MusicData.getArtistById(id).subscribe((data)=>{
      console.log('API response');
      this.artists = data;
    });

    this.albumSubscribe = this.MusicData.getAlbumsByArtistId(id).subscribe((result)=>{
      this.albums = result.items.filter((curValue:any, index:any, self:any) => self.findIndex((t:any) => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.albumSubscribe?.unsubscribe();
  }
}

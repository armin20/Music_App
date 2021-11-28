import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  results: any;
  searchQuery: String = "";
  sub: any;
  spinner: boolean = true;

  constructor(private route: ActivatedRoute, private musicDataService: MusicDataService) { 
  }
  
  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params=>{
        this.searchQuery = params.q;
        this.musicDataService.searchArtists(this.searchQuery).subscribe((data)=>{
          this.results = data.artists.items.filter((artist: any)=>{
            if(artist.images.length > 0){
              this.spinner = false;
              return artist;
            }
          });
        });
    });
  }

  ngOnDestroy(): void{
    this.sub?.unsubscribe();
  }
}

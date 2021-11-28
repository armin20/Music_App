import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../../music-data.service';
@Component({
  selector: 'app-new-releases-component',
  templateUrl: './new-releases-component.component.html',
  styleUrls: ['./new-releases-component.component.css']
})
export class NewReleasesComponentComponent implements OnInit {
  
  releases: any;
  subs: any;
  spinner: boolean = true;
  constructor(private dataMusicService: MusicDataService) {

  }
  
  ngOnInit(): void {
  this.subs = this.dataMusicService.getNewReleases().subscribe((data)=>{
    if(data){
      this.spinner = false;
      this.releases = data.albums.items;
    }

  });
  }

  ngOnDestroy(): void{
    this.subs?.unsubscribe();
  }
}

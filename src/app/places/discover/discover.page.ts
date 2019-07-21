import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  isLoading = false;
  placesSub: Subscription;
  private chosenFilter = 'all';

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      if(this.chosenFilter === 'all') {
        this.relevantPlaces = this.loadedPlaces;
        this.listedLoadedPlaces = this.relevantPlaces.slice(1);
      }else{
        this.relevantPlaces = this.loadedPlaces.filter(place => place.userId !== this.authService.userId);
        this.listedLoadedPlaces = this.relevantPlaces.slice(1);
      }
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false; 
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle('m1');
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if(event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
      this.chosenFilter = 'all';
    }else {
      this.relevantPlaces = this.loadedPlaces.filter(place => place.userId !== this.authService.userId);
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
      this.chosenFilter = 'bookable';
    }
  }
  ngOnDestroy() {
    if(this.placesSub) this.placesSub.unsubscribe();
  }

}

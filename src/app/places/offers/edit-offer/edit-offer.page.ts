import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      console.log('ParamMap: ', paramMap);
      if(!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      console.log('Starting extract place with placeId of: ', paramMap.get('placeId'));
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
      console.log('Selected Place: ', this.place);

    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Property } from 'src/app/model/Property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId : number;

  property = new Property();

  constructor(private route: ActivatedRoute, private router : Router,
    private housingservice: HousingService) { }

    ngOnInit() {
      this.propertyId = +this.route.snapshot.params['id'];
      this.route.data.subscribe(
        (data: any) => {
          this.property = data['prp']

        }
      )

      // this.route.params.subscribe(
      //   (params) => {
      //     this.propertyId = +params['id'];
      //     this.housingservice.getProperty(this.propertyId).subscribe(
      //       (data: any) => {
      //         this.property = data;
      //       }
      //     );
      //   }
      // );

    }

    imgCollection: Array<object> = [
      {
        image: 'data:image/jpeg;base64,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',
        thumbImage: 'https://source.unsplash.com/random/?house,interior',
        alt: 'Image 1',
        title: 'Image 1'
      }, {
        image: '../assets/images/{{property.Image}}.jpeg',
        thumbImage: 'https://source.unsplash.com/random/?house,bedroom',
        title: 'Image 2',
        alt: 'Image 2'
      }, {
        image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fcdn.home-designing.com%2Fwp-content%2Fuploads%2F2013%2F06%2Fmodern-neutral-living-room-4.jpg&tbnid=C_ZMi6c0ZdqEkM&vet=12ahUKEwiG3duX_K7-AhVv53MBHZ4yAQkQMygIegUIARD4AQ..i&imgrefurl=http%3A%2F%2Fwww.home-designing.com%2F2013%2F06%2Fmodern-house-interiors-with-dynamic-texture-and-pattern&docid=-miqwlNS4KHiWM&w=1200&h=900&q=house%20interior%20images&ved=2ahUKEwiG3duX_K7-AhVv53MBHZ4yAQkQMygIegUIARD4AQ',
        thumbImage: 'https://source.unsplash.com/random/?house,room',
        title: 'Image 3',
        alt: 'Image 3'
      }, {
        image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcarlislehomes.com.au%2Fassets%2FUploads%2F8b2be161ec%2FModern-Mediterranean.jpg&tbnid=JdpNO7bhQQ-eDM&vet=12ahUKEwiG3duX_K7-AhVv53MBHZ4yAQkQMygOegUIARCEAg..i&imgrefurl=https%3A%2F%2Fcarlislehomes.com.au%2Finteriors%2F&docid=egw0wbRB5BEfnM&w=1560&h=1012&q=house%20interior%20images&ved=2ahUKEwiG3duX_K7-AhVv53MBHZ4yAQkQMygOegUIARCEAg',
        thumbImage: 'https://source.unsplash.com/random/?house,kitchen',
        title: 'Image 4',
        alt: 'Image 4'
      }, {
        image: 'https://loremflickr.com/600/400/paris,girl/all',
        thumbImage: 'https://source.unsplash.com/random/?bunglow,room',
        title: 'Image 5',
        alt: 'Image 5'
      },
      {
        image: 'https://loremflickr.com/600/400/paris,girl/all',
        thumbImage: 'https://source.unsplash.com/random/?house,bathroom',
        title: 'Image 6',
        alt: 'Image 6'
      }
  ];


}

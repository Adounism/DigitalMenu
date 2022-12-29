import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit {
  constructor(private alertController: AlertController) {

  }
  ngOnInit() {

    // this.presentAlert();
  }

  ionViewDidLoad(){

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Notez votre commande',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {

          },
        },
      ],
      inputs: [
        {
          type: 'radio',
          label: '1 étoile',
          value: '1',
          cssClass: 'star-rating'
        },
        {
          type: 'radio',
          label: '2 étoiles',
          value: '2',
          cssClass: 'star-rating'
        },
        {
          type: 'radio',
          label: '3 étoiles',
          value: '3',
          cssClass: 'star-rating'
        },
        {
          type: 'radio',
          label: '4 étoiles',
          value: '4',
          cssClass: 'star-rating'
        },
        {
          type: 'radio',
          label: '5 étoiles',
          value: '5',
          cssClass: 'star-rating'
        },
        {
          type: 'textarea',
          placeholder: 'un commentaire',
        }
      ],

    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    // this.roleMessage = `Dismissed with role: ${role}`;
  }
}

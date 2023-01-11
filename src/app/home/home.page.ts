import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpServices } from '../services/http-services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  primary = '#3c3e44';
  tablesListes: any[] = [];
  tableOrders: any[] = [];
  tableID!: number;
  productRating!: number;
  constructor(
    private httpService: HttpServices,
    private router: Router,
    private alertController: AlertController
  ) {
    // this.tableID = this.router.snapshot.params['id'];

    this.getAllTables();
    this.getAllOrders();
  }

  getAllTables() {
    this.httpService.getAllTables().subscribe((data) => {
      this.tablesListes = data;

      this.getAllOrders();
    });
  }

  navigate(id: any) {
    this.router.navigate(['/food']);
    localStorage.setItem('table', id);
  }

  getAllOrders() {
    this.httpService.getAllOrders().subscribe((data) => {
      this.tableOrders = data;
      console.table(this.tableOrders);

      // this.tableOrders.forEach(orders=>{

      // })
    });
  }

  onRatingChanged(event: any) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Notez votre commande',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {},
        },
      ],
      inputs: [
        {
          type: 'radio',
          label: '1 étoile',
          value: '1',
          cssClass: 'star-rating',
        },
        {
          type: 'radio',
          label: '2 étoiles',
          value: '2',
          cssClass: 'star-rating',
        },
        {
          type: 'radio',
          label: '3 étoiles',
          value: '3',
          cssClass: 'star-rating',
        },
        {
          type: 'radio',
          label: '4 étoiles',
          value: '4',
          cssClass: 'star-rating',
        },
        {
          type: 'radio',
          label: '5 étoiles',
          value: '5',
          cssClass: 'star-rating',
        },
        {
          type: 'textarea',
          placeholder: 'un commentaire',
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    // this.roleMessage = `Dismissed with role: ${role}`;
  }

  getBackgroundColorClass(status: string) {
    switch (status) {
      case 'paid':
        return 'bg-green';
      case 'await':
        return 'bg-yellow';
      case 'occupied':
        return 'bg-red';
      default:
        return '';
    }
  }

  getBackgroundColor(status: string) {
    switch (status) {
      case 'paid':
        return '#069b47';
      case 'wait':
        return '#ffa329';
      case 'occupied':
        return '#ff3333';
      default:
        return '#ffffff';
    }
  }

  getCardClass(status: string) {
    switch (status) {
      case 'paid':
        return 'available';
      default:
        return '';
    }
  }
}

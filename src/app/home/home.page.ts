import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpServices } from '../services/http-services.service';
import { TableService } from '../services/table.service';

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
  takeaway= "takeaway";
  productRating!: number;
  constructor(
    private httpService: HttpServices,
    private router: Router,
    private tableService:TableService,
    private alertController: AlertController
  ) {
    //this.tableID = this.router.snapshot.params['id'];

    this.getAllTables();
    this.getAllOrders();
    this.getAllTable();
    localStorage.removeItem('table');
  }

  ionViewWillEnter() {

  }

  getAllTables() {
    this.tablesListes = [];
    this.httpService.getAllTables().subscribe((data) => {
      this.tablesListes = data;
      this.tableService.updateTables(data);
      // console.log(this.tablesListes);

      // this.getAllOrders();
    });

  }

  getAllTable() {
    this.httpService.getAllTable().subscribe((data) => {
      this.tablesListes = data;
      this.tableService.updateTables(data);
      // console.log(this.tablesListes);

      // this.getAllOrders();
    });

  }

  navigate(id: any) {
    this.router.navigate(['/food']);
    localStorage.setItem('table', id);
  }

  takeawaynavgiate(){
    this.router.navigate(['/food']);
    localStorage.setItem('takeaway', this.takeaway);
    localStorage.removeItem('table');
  }

  getAllOrders() {
    this.httpService.getAllOrders().subscribe((data) => {
      this.tableOrders = data;
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

  // getBackgroundColor(status: string) {
  //   switch (status) {
  //     case 'wait':
  //       return '#ffa329';
  //     case 'occupied':
  //       return '#ff3333';
  //     default:
  //       return '#ffffff';
  //   }
  // }

  getCardClass(status: string) {

    switch (status) {
      case 'paid':
        return 'available';
      case 'wait':
        return 'wait';
      case 'occupied':
        return '#ff3333';
      default:
        return '';
    }
  }
}

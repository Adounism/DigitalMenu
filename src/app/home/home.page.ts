import { Component } from '@angular/core';
import { HttpServices } from '../services/http-services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  primary ="rgba(36,39,46,255)";
  tablesListes:any[]=[];
  constructor(private httpService: HttpServices) {
    this.getAllTables();
  }


  getAllTables(){
    this.httpService.getAllTables().subscribe(data=>{
      this.tablesListes = data;
      console.log(data);

    })
  }

}

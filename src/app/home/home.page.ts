import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServices } from '../services/http-services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  primary ="rgba(36,39,46,255)";
  tablesListes:any[]=[];
  tableID!:number;
  constructor(private httpService: HttpServices, private router: Router) {
    // this.tableID = this.router.snapshot.params['id'];
    console.log(this.tableID);

    this.getAllTables();
  }


  getAllTables(){
    this.httpService.getAllTables().subscribe(data=>{
      this.tablesListes = data;
      console.log(data);

    });
  }


  navigate(id:any){
    this.router.navigate(['/food']);
    localStorage.setItem("table", id);

  }

}

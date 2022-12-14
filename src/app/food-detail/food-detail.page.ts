import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodPage } from '../food/food.page';
import { HttpServices } from '../services/http-services.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {

  primary ="rgba(36,39,46,255)";
  params!: Object;
  pushPage: any;
  currentFoods:any;
  currentFoodId!:number;
  foodIngredients:any[] = [];
  constructor(private services : HttpServices, private router:ActivatedRoute) {
    this.currentFoodId = router.snapshot.params['id'];
    this.pushPage = FoodPage;
    this.params = { id: 42 };
   }

  ngOnInit() {
    this.getCurrentFoodData();
  }


  getCurrentFoodData(){
    this.services.getfindFoodsInCategorys(this.currentFoodId).subscribe(data=>{
      this.currentFoods = data;
      console.log(this.currentFoods.name);

    })
  }

}

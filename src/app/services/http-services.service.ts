import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpServices {

  private BaseUrl = environment.BaseUrl;
   category = {
    allCategories:this.BaseUrl+"categories",
    findCategorie:this.BaseUrl+"categories/"
  }

  foods = {
    allFoods:this.BaseUrl+"food",
    findFood:this.BaseUrl+"food/"
  }

  foodOrders = {
    foodOrder:this.BaseUrl+"food_orders",
    makeFoodOrder:this.BaseUrl+"food_orders",
    findFoodOrder:this.BaseUrl+"food_orders/"
  }

  foodRates = {
    allFoodRate:this.BaseUrl+"food_rates",
    rateFoods:this.BaseUrl+"food_rates",
    findFoodRate:this.BaseUrl+"food_rates/"
  }

  options = {
    allOptions:this.BaseUrl+"options",
    findOptions:this.BaseUrl+"options/"
  }
  ordering = {
    allOrderings:this.BaseUrl+"orderings",
    makeOrderings:this.BaseUrl+"orderings",
    findOrdering:this.BaseUrl+"orderings/"
  }

  tables = {
    allTable: this.BaseUrl + "tables"
  }

  private dataCache: any ;
  constructor(private http: HttpClient, private storage: StorageService) { }


  // getData(id: string): Observable<any> {
  //   if (this.dataCache[id]) {
  //     return of(this.dataCache[id]);
  //   }

  //   return this.http.get('https://my-api.com/data/' + id).pipe(
  //     map(data => {
  //       this.dataCache[id] = data;
  //       return data;
  //     }),
  //     catchError(error => {
  //       console.error('Error getting data:', error);
  //       return of(null);
  //     })
  //   );
  // }



   getCategory(): Observable<any> {
    if (this.dataCache) {
      // Retourne les données mises en cache si elles existent
      return of(this.dataCache);
    } else {
      // Sinon, effectue une requête HTTP vers l'API et mets en cache les données
      return this.http.get(`${this.category.allCategories}`).pipe(
        map(data => {
          this.dataCache = data;
         // Enregistrez les données de l'API dans le cache en utilisant le service StorageService
           this.storage.setData('category', data);
          return data;
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération des données', error);
          throw error;
        })
      );
    }
  }

  getFoodInCategorys(id:string): Observable<any>{
    return this.http.get(`${this.foods.allFoods}?category=${id}`).pipe(map(data=>{
      console.log(data);
      return data;
    }))

    // return this.http.get(`${this.foods.allFoods}`).pipe(map(data=>{
    //   console.log(data);

    // }))
  }

  getfindFoodsInCategorys(id:number): Observable<any>{
    return this.http.get(`${this.foods.findFood}`+id).pipe(map(data=>{
      console.log(data);
      return data;
    }))

    // return this.http.get(`${this.foods.allFoods}`).pipe(map(data=>{
    //   console.log(data);

    // }))
  }
  async getCachedData() {
    // Récupérez les données de l'API du cache en utilisant le service StorageService
    const cachedData = await this.storage.getData('category');
  }



  getAllTables(): Observable<any>{
    return this.http.get(`${this.tables.allTable}`).pipe(
      map(data=>{
        return data;
      })
    )

  }

  getAllOptions():Observable<any>{
    return this.http.get(`${this.options.allOptions}`).pipe(
      map(data=>{
        return data;
      })
    )
  }

  searchFood(food_name:string):Observable<any>{

    return this.http.get(`${this.foods.allFoods}?name=${food_name}`).pipe(
      map(data=>{
        return data;
      })
    )
  }

  makeOrdering(data: any):Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/ld+json'
      })
    };
    return this.http.post(`${this.ordering.makeOrderings}`, data, httpOptions).toPromise();

  }

  getAllOrders():Observable<any>{
    return this.http.get(`${this.foodOrders.foodOrder}`).pipe(map(data=>{
      return data;
    }))
  }
}

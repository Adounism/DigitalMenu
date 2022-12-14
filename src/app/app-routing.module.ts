import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    // redirectTo: 'food-detail',
    // redirectTo: 'home',
    redirectTo: 'food',
    // redirectTo: 'langage',
    pathMatch: 'full'
  },
  {
    path: 'food',
    loadChildren: () => import('./food/food.module').then( m => m.FoodPageModule)
  },
  {
    path: 'langage',
    loadChildren: () => import('./langage/langage.module').then( m => m.LangagePageModule)
  },
  {
    path: 'card-side-menu',
    loadChildren: () => import('./card-side-menu/card-side-menu.module').then( m => m.CardSideMenuPageModule)
  },
  {
    path: 'food-detail/:id',
    loadChildren: () => import('./food-detail/food-detail.module').then( m => m.FoodDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

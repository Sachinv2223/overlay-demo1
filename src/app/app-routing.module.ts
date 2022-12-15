import { Example2Component } from './example2/example2.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: 'example2', component: Example2Component },
  { path: 'home', component: HomepageComponent },

  { path: '', pathMatch: 'full', redirectTo: 'example2' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

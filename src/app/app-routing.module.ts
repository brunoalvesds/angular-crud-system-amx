import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListPeopleComponent } from './pages/list-people/list-people.component';
import { CreateUpdatePersonComponent } from './pages/create-update-person/create-update-person.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'people', component: ListPeopleComponent },
  { path: 'people/new', component: CreateUpdatePersonComponent },
  { path: 'people/:id', component: CreateUpdatePersonComponent },
  { path: 'people/:id/edit', component: CreateUpdatePersonComponent },
  { path: 'sign-in', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

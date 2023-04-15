import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPeopleComponent } from './pages/list-people/list-people.component';
import { CreateUpdatePersonComponent } from './pages/create-update-person/create-update-person.component';

const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'people', component: ListPeopleComponent },
  { path: 'people/create', component: CreateUpdatePersonComponent },
  { path: 'people/:id/edit', component: CreateUpdatePersonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

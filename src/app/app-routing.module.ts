import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ListPeopleComponent } from './pages/list-people/list-people.component';
import { CreateUpdatePersonComponent } from './pages/create-update-person/create-update-person.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'people', component: ListPeopleComponent, canActivate: [AuthGuard] },
  { path: 'people/new', component: CreateUpdatePersonComponent, canActivate: [AuthGuard] },
  { path: 'people/:id', component: CreateUpdatePersonComponent, canActivate: [AuthGuard] },
  { path: 'people/:id/edit', component: CreateUpdatePersonComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

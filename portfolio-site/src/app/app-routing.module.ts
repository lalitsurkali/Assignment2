import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [{
  path: '',
    component: HomeComponent

},
  {
    path: 'home',
    component: HomeComponent

  },
  {
    path: 'aboutme',
    component: AboutMeComponent

  },
  {
    path: 'projects',
    component: ProjectsComponent

  },
  {
    path: 'services',
    component: ServicesComponent

  },
 

  
  {
  path: 'contact',
  component: ContactComponent

},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

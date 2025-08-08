import { Routes } from '@angular/router';
import { ResumeTemplate01 } from '../templates/resume-template-01/resume-template-01';
import { Home } from '../home/home';
import { TemplateLayout } from '../template-layout/template-layout';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: '', redirectTo:'home', pathMatch: 'full' },
  {
    path: 'template',
    component: TemplateLayout,
    children: [
      {
        path: 'resume-template-01',
        component: ResumeTemplate01,
      },
    ],
  },
];

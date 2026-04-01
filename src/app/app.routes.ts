import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { bibliothecaireGuard } from './core/guards/bibliothecaire.guard';
import { LoginComponent } from './features/login/login.component';
import { ShellComponent } from './layout/shell/shell.component';
import { SearchComponent } from './features/search/search.component';
import { ResourceDetailComponent } from './features/resource-detail/resource-detail.component';
import { MyLoansComponent } from './features/my-loans/my-loans.component';
import { UserCreateComponent } from './features/user-create/user-create.component';
import { UserListComponent } from './features/user-list/user-list.component';
import { ResourceCreateComponent } from './features/resource-create/resource-create.component';
import { LateFeesComponent } from './features/late-fees/late-fees.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'recherche' },
      { path: 'recherche', component: SearchComponent },
      { path: 'utilisateurs', component: UserListComponent, canActivate: [bibliothecaireGuard] },
      { path: 'utilisateurs/nouveau', component: UserCreateComponent, canActivate: [bibliothecaireGuard] },
      { path: 'ressources/nouvelle', component: ResourceCreateComponent, canActivate: [bibliothecaireGuard] },
      { path: 'ressources/:id', component: ResourceDetailComponent },
      { path: 'mes-emprunts', component: MyLoansComponent },
      { path: 'retards', component: LateFeesComponent, canActivate: [bibliothecaireGuard] }
    ]
  },
  { path: '**', redirectTo: '' }
];
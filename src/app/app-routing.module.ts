import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MedicamentComponent } from './components/medicament/medicament.component';
import { CreateMedicamentComponent } from './components/medicament/create-medicament/create-medicament.component';
import { EditMedicamentComponent } from './components/medicament/edit-medicament/edit-medicament.component';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';
import { LoginComponent } from './components/login/login.component';
import { PatientComponent } from './components/patient/patient.component';
import { VenteComponent } from './components/vente/vente.component';
import { HistoriqueComponent } from './components/historique/historique.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'medicaments', component: MedicamentComponent },
      { path: 'medicaments/create', component: CreateMedicamentComponent },
      { path: 'medicaments/edit/:id', component: EditMedicamentComponent },
      { path: 'fournisseurs', component: FournisseurComponent },
      { path: 'patients', component: PatientComponent },
      { path: 'ventes', component: VenteComponent },
      { path: 'historique', component: HistoriqueComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
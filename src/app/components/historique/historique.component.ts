import { Component, OnInit } from '@angular/core';
import { VenteService } from '../../services/vente.service';
import { MedicamentService } from '../../services/medicament.service';
import { PatientService } from '../../services/patient.service';
import { Vente } from '../../models/vente.model';
import { Medicament } from '../../models/medicament.model';
import { Patient } from '../../models/patient.model';

@Component({
  standalone: false,
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'medicament', 'patient', 'quantite', 'pharmacien'];
  dataSource: Vente[] = [];
  medicaments: Medicament[] = [];
  patients: Patient[] = [];

  constructor(
    private venteService: VenteService,
    private medicamentService: MedicamentService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.medicamentService.getAllMedicaments().subscribe(data => {
      this.medicaments = data;
    });
    this.patientService.getAllPatients().subscribe(data => {
      this.patients = data;
    });
    this.venteService.getAllVentes().subscribe(data => {
      this.dataSource = data.reverse();
    });
  }

  getMedicamentNom(id: number): string {
    const m = this.medicaments.find(m => m.id == id);
    return m ? m.nom : 'Inconnu';
  }

  getPatientNom(id: number): string {
    const p = this.patients.find(p => p.id == id);
    return p ? p.nom + ' ' + p.prenom : 'Inconnu';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
}

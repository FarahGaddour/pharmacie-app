import { Component, OnInit } from '@angular/core';
import { MedicamentService } from '../../services/medicament.service';
import { FournisseurService } from '../../services/fournisseur.service';
import { PatientService } from '../../services/patient.service';
import { VenteService } from '../../services/vente.service';
import { Medicament } from '../../models/medicament.model';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalMedicaments = 0;
  totalFournisseurs = 0;
  totalPatients = 0;
  totalVentes = 0;
  stockFaible = 0;
  medicamentsCritiques: Medicament[] = [];

 //graphouet
  donutData: ChartData<'doughnut'> = { labels: [], datasets: [{ data: [] }] };
  barData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], label: 'Stock' }] };
  lineData: ChartData<'line'> = { labels: [], datasets: [{ data: [], label: 'Stock' }] };
  pieData: ChartData<'pie'> = { labels: [], datasets: [{ data: [] }] };

  donutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { position: 'bottom' } }
  };

  barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } }
  };

  lineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } }
  };

  pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { position: 'bottom' } }
  };

  constructor(
    private medicamentService: MedicamentService,
    private fournisseurService: FournisseurService,
    private patientService: PatientService,
    private venteService: VenteService
  ) {}

  ngOnInit(): void {
    this.medicamentService.getAllMedicaments().subscribe(data => {
      this.totalMedicaments = data.length;
      this.stockFaible = data.filter(m => m.stock < 20).length;
      this.medicamentsCritiques = data.filter(m => m.stock < 20);

      // Donut 
      const categories: any = {};
      data.forEach(m => {
        categories[m.categorie] = (categories[m.categorie] || 0) + 1;
      });
      this.donutData = {
        labels: Object.keys(categories),
        datasets: [{ data: Object.values(categories), backgroundColor: ['#3f51b5','#4caf50','#f44336','#ff9800','#9c27b0'] }]
      };

      // Bar 
      this.barData = {
        labels: data.map(m => m.nom),
        datasets: [{ data: data.map(m => m.stock), label: 'Stock', backgroundColor: '#3f51b5' }]
      };

      // Line
      this.lineData = {
        labels: data.map(m => m.nom),
        datasets: [{ data: data.map(m => m.stock), label: 'Stock', borderColor: '#4caf50', fill: false }]
      };

      // Pie
      const normal = data.filter(m => m.stock >= 20).length;
      const critique = data.filter(m => m.stock < 20).length;
      this.pieData = {
        labels: ['Stock Normal', 'Stock Critique'],
        datasets: [{ data: [normal, critique], backgroundColor: ['#4caf50', '#f44336'] }]
      };
    });

    this.fournisseurService.getAllFournisseurs().subscribe(data => {
      this.totalFournisseurs = data.length;
    });

    this.patientService.getAllPatients().subscribe(data => {
      this.totalPatients = data.length;
    });

    this.venteService.getAllVentes().subscribe(data => {
      this.totalVentes = data.length;
    });
  }
}
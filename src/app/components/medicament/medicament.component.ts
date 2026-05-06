import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MedicamentService } from '../../services/medicament.service';
import { FournisseurService } from '../../services/fournisseur.service';
import { Medicament } from '../../models/medicament.model';
import { Fournisseur } from '../../models/fournisseur.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  standalone: false,
  selector: 'app-medicament',
  templateUrl: './medicament.component.html',
  styleUrls: ['./medicament.component.css']
})
export class MedicamentComponent implements OnInit, AfterViewInit {

  isAdmin = localStorage.getItem('userRole') === 'admin';
  displayedColumns: string[] = ['id', 'nom', 'prix', 'stock', 'categorie', 'fournisseur', 'actions'];
  dataSource = new MatTableDataSource<Medicament>();
  fournisseurs: Fournisseur[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private medicamentService: MedicamentService,
    private fournisseurService: FournisseurService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadFournisseurs();
    this.fetch();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetch(): void {
    this.medicamentService.getAllMedicaments().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  loadFournisseurs() {
    this.fournisseurService.getAllFournisseurs().subscribe(data => {
      this.fournisseurs = data;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFournisseurNom(id: number): string {
    const f = this.fournisseurs.find(f => f.id == id);
    return f ? f.nom : 'Inconnu';
  }

  editMedicament(id: number) {
    this.router.navigate(['/medicaments/edit', id]);
  }

  deleteMedicament(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medicamentService.deleteMedicament(id).subscribe(() => {
          this.fetch();
        });
      }
    });
  }
}
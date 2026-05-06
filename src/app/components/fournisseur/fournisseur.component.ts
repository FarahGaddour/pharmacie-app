import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FournisseurService } from '../../services/fournisseur.service';
import { Fournisseur } from '../../models/fournisseur.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  standalone: false,
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'email', 'telephone', 'ville', 'actions'];
  dataSource: Fournisseur[] = [];
  fournisseurForm: FormGroup;
  showForm = false;
  isEdit = false;
  selectedId!: number;

  constructor(
    private fournisseurService: FournisseurService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.fournisseurForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      ville: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs() {
    this.fournisseurService.getAllFournisseurs().subscribe(data => {
      this.dataSource = data;
    });
  }

  openForm() {
    this.showForm = true;
    this.isEdit = false;
    this.fournisseurForm.reset();
  }

  editFournisseur(fournisseur: Fournisseur) {
    this.showForm = true;
    this.isEdit = true;
    this.selectedId = fournisseur.id!;
    this.fournisseurForm.patchValue(fournisseur);
  }

  deleteFournisseur(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fournisseurService.deleteFournisseur(id).subscribe(() => {
          this.loadFournisseurs();
        });
      }
    });
  }

  onSubmit() {
    if (this.fournisseurForm.valid) {
      if (this.isEdit) {
        this.fournisseurService.updateFournisseur(this.selectedId, this.fournisseurForm.value).subscribe(() => {
          this.loadFournisseurs();
          this.showForm = false;
        });
      } else {
        this.fournisseurService.createFournisseur(this.fournisseurForm.value).subscribe(() => {
          this.loadFournisseurs();
          this.showForm = false;
        });
      }
    }
  }

  annuler() {
    this.showForm = false;
    this.fournisseurForm.reset();
  }
}
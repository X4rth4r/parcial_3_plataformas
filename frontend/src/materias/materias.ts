import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materias',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule],
  templateUrl: './materias.html',
  styleUrl: './materias.css',
})
export class materias implements OnInit {
  private readonly url = 'http://localhost:3000/api/v1/materias';

  displayedColumns = signal<string[]>([]);
  listaMaterias = signal<any[]>([]);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarMaterias();
    }
  }

  cargarMaterias(): void {
    this.http.get<any>(this.url).subscribe({
      next: (data) => {
        const materias = data?.materias ?? [];
        this.listaMaterias.set(materias);
        this.displayedColumns.set(materias.length > 0 ? Object.keys(materias[0]) : []);
      },
      error: () => {
        this.listaMaterias.set([]);
        this.displayedColumns.set([]);
      },
    });
  }

  guardar(codigo: string, nombre: string, creditos: string, descripcion: string): void {
    const body = {
      codigo,
      nombre,
      creditos: Number(creditos) || 3,
      descripcion,
    };

    this.http.post(this.url, body).subscribe({
      next: (data: any) => {
        if (data?.ok) {
          this.cargarMaterias();
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'Materia agregada correctamente',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar la materia',
          });
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo conectar con el servidor',
        });
      },
    });
  }
}

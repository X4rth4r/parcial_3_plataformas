import { pool } from '../config/db';

export class MateriasModel {
  static async obtenerTodas() {
    const r = await pool.query('SELECT * FROM materias ORDER BY id');
    return r.rows;
  }

  static async crear(codigo: string, nombre: string, creditos: number, descripcion: string) {
    const r = await pool.query(
      'INSERT INTO materias (codigo, nombre, creditos, descripcion) VALUES ($1, $2, $3, $4) RETURNING *',
      [codigo, nombre, creditos, descripcion]
    );
    return r.rows[0];
  }
}

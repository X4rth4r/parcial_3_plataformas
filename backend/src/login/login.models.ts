import { pool } from '../config/db';

export interface Usuario {
  id?: number;
  usuario: string;
  contrasena: string;
}

export class LoginModel {
  static async login(usuario: string, contrasena: string): Promise<boolean> {
    const r = await pool.query(
      'SELECT id FROM usuarios WHERE (email = $1 OR nombre = $1) AND password_hash = $2',
      [usuario, contrasena]
    );
    return r.rows.length > 0;
  }
}
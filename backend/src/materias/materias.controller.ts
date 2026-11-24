import { Request, Response } from 'express';
import { MateriasModel } from './materias.models';

export const obtenerMaterias = async (_req: Request, res: Response) => {
  try {
    const materias = await MateriasModel.obtenerTodas();
    res.json({ ok: true, materias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, materias: [] });
  }
};

export const crearMateria = async (req: Request, res: Response) => {
  try {
    const { codigo, nombre, creditos, descripcion } = req.body ?? {};
    const materia = await MateriasModel.crear(
      codigo,
      nombre,
      Number(creditos) || 3,
      descripcion
    );
    res.status(201).json({ ok: true, materia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false });
  }
};

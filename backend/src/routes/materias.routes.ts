import { Router } from 'express';
import { crearMateria, obtenerMaterias } from '../materias/materias.controller';

const router = Router();

router.get('/', obtenerMaterias);
router.post('/', crearMateria);

export default router;

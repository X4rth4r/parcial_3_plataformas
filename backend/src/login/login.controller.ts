import { Request, Response } from 'express';
import { LoginModel } from './login.models';

export const login = async (req: Request, res: Response) => {
  try {
    const { usuario, contrasena } = req.body ?? {};
    const ok = await LoginModel.login(usuario, contrasena);
    res.json({ ok });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false });
  }
};
import { Router } from 'express';
import { createVaga, getAllVagas, getVagaById, updateVaga, deleteVaga, getCargo, getLocalizacao } from '../controllers/vagaController.js';

export const vagaRoutes = Router();
export const routes = Router()

vagaRoutes.post('/', createVaga);
vagaRoutes.get('/', getAllVagas);
vagaRoutes.get('/:id', getVagaById);
vagaRoutes.put('/:id', updateVaga);
vagaRoutes.delete('/:id', deleteVaga);

routes.get('/cargo/:cargo', getCargo)
routes.get('/localizacao/:cidade', getLocalizacao)

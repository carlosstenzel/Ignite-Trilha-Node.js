import { CreateRentalController } from '@modules/rentais/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentais/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentais/useCases/listRentalsByUser/ListRentalsByUserController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated , createRentalController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated , devolutionRentalController.handle);

rentalRoutes.get("user", ensureAuthenticated, listRentalsByUserController.handle);

export {rentalRoutes};
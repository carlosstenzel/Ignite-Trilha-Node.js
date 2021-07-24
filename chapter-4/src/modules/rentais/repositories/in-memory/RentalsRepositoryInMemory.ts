import { Rental } from "@modules/rentais/infra/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {

    rentals : Rental[] = [];

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.car_id === car_id && rental.end_date === null );
    }
    
    async findOpenrentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.car_id === user_id && rental.end_date === null );
    }

}

export { RentalsRepositoryInMemory};
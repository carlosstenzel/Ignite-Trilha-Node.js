import { ICreateRentalDTO } from "@modules/rentais/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentais/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {

    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOne({ car_id });
    }

    async findOpenrentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({ user_id });
    }

    async create({car_id, expected_return_date, user_id}: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id, expected_return_date, user_id
        });

        await this.repository.save(rental);

        return rental;
    }

}

export { RentalsRepository };
import { Rental } from "@modules/rentais/infra/entities/Rental";
import { IRentalsRepository } from "@modules/rentais/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalsByUserUseCase {

    constructor(
        @inject("RentlasRepository")
        private rentalsRepository: IRentalsRepository
    ) {}

    async execute(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.rentalsRepository.findByUser(user_id);
        return rentalsByUser;
    }
}

export {ListRentalsByUserUseCase};
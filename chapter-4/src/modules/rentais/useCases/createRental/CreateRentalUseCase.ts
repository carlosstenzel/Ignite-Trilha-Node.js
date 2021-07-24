import daysjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Rental } from "@modules/rentais/infra/entities/Rental";
import { IRentalsRepository } from "@modules/rentais/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

daysjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {

    constructor(
        private rentalsRepository: IRentalsRepository
    ) {};

    async execute({user_id, car_id, expected_return_date}: IRequest): Promise<Rental> {

        const minimumHour = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnavailable){
            throw new AppError('Car is unavailable');
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenrentalByUser(user_id);

        if(rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!");
        }

        const expectedReturnDateFormat = daysjs(expected_return_date).utc().local().format();
        const dateNow = daysjs().utc().local().format();
        const compare = daysjs(expectedReturnDateFormat).diff(dateNow, "hours");

        if(compare < minimumHour) {
            throw new AppError("Invalid return time!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;

    }
}

export { CreateRentalUseCase };
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsUseCase : ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async() => {

        const car = await carsRepositoryInMemory.create({
                name: "Name car",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category_id"
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able t list all available cars by name", async() => {
        const car = await carsRepositoryInMemory.create({
            name: "Name car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand_teste",
            category_id: "category_id"
        });

        const cars = await listCarsUseCase.execute({
            brand: "Brand_teste"
        });

        expect(cars).toEqual([car]);
    });

});
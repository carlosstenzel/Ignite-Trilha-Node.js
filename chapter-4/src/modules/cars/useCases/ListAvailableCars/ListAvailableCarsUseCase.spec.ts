import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listCarsUseCase : ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

    it("should be able t list all available cars by brand", async() => {
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

    it("should be able t list all available cars by name", async() => {
        const car = await carsRepositoryInMemory.create({
            name: "Name car 12345",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand_teste",
            category_id: "category_id"
        });

        const cars = await listCarsUseCase.execute({
            name: "Name car 12345"
        });

        expect(cars).toEqual([car]);
    });

    it("should be able t list all available cars by category", async() => {
        const car = await carsRepositoryInMemory.create({
            name: "Name car 12345",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand_teste",
            category_id: "12345"
        });

        const cars = await listCarsUseCase.execute({
            category_id: "12345"
        });

        expect(cars).toEqual([car]);
    });

});
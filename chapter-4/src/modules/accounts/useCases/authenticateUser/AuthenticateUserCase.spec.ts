import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase : AuthenticateUserUseCase;
let usersRepositoryInMemory : UsersRepositoryInMemory;
let createUserUserCase : CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach( () => {

        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUserCase = new CreateUserUseCase(usersRepositoryInMemory);

    });

    it("should be able to authenticate an user", async () => {
        const user :ICreateUserDTO = {
            driver_license: "000123",
            email: "user@teste.com",
            name: "User Test",
            password: "12345"
        };

        await createUserUserCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token");

    });

    it("should  not be able to authenticate an none existent user", () => {
     
        expect( async () => {
            await authenticateUserUseCase.execute({
                email: "teste@teste.com",
                password: "12345"
            })
        }).rejects.toBeInstanceOf(AppError);

    });

    it("should  not be able to authenticate with incorrect password", () => {
     
        expect( async () => {

            const user :ICreateUserDTO = {
                driver_license: "000123",
                email: "user@teste.com",
                name: "User Test",
                password: "12345"
            };
    
            await createUserUserCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "12345678"
            })
        }).rejects.toBeInstanceOf(AppError);

    });

});


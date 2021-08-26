import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { create } from "handlebars";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {

    beforeEach(( ) => {

        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new  UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();

         sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
             usersRepositoryInMemory,
             usersTokensRepositoryInMemory,
             dateProvider,
             mailProvider
         );
    })

    it("should be able to send a forgot password mail to user", async () => {

        const sendMail = spyOn(mailProvider, 'sendMail');

        await usersRepositoryInMemory.create({
            driver_license: '4343',
            email: 'teste@teste.com',
            name: "Teste 01",
            password: '123'
        });

        await sendForgotPasswordMailUseCase.execute('teste@teste.com');

        expect(sendMail).toHaveBeenCalled();
    })

    it("should not be able to send an email id user does not exists", async () => {

        await expect(
            sendForgotPasswordMailUseCase.execute('carlos@teste.com')
        ).rejects.toEqual(new AppError("User does not exists"));

    });

    it('should be able to create an users token', async () => {
        const generateToken =  spyOn(usersRepositoryInMemory, 'create');

        await usersRepositoryInMemory.create({
            driver_license: '434344',
            email: 'teste2@teste.com',
            name: "Teste 02",
            password: '123'
        });

        await sendForgotPasswordMailUseCase.execute('teste2@teste.com');
        
        expect(generateToken).toBeCalled();

    })

})
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
    async handle(request: Request, response: Response) : Promise<Response> {
        const {token} = request.query;
        const {password} = request.body;
        const resetPasswordUserUserCase = container.resolve(ResetPasswordUserCase);

        await resetPasswordUserUserCase.execute({ token: String(token), password});

        return response.send();
    }
}

export { ResetPasswordUserController }
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRepository = getCustomRepository(UserRepository);

        // SELECT * FROM users WHERE email = "<parametro>"
        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            return response.status(400).json({
                error: "User alterady exists!",
            });
        }

        // primeiro deve ser criado o usuário
        const user = usersRepository.create({
            name, email
        });

        // para após isso, salvar o mesmo
        await usersRepository.save(user);

        return response.status(201).json(user)
    }

}

export { UserController };

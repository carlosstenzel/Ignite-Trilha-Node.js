import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body;

    const categoryAlreadyExists = categoriesRepository.findByName(name);

    if(categoryAlreadyExists) {
        return response.status(403).json({error: "Category Already exists!"});
    }

    categoriesRepository.create({name, description});

    return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
    return response.json(categoriesRepository.list());
})


export { categoriesRoutes };
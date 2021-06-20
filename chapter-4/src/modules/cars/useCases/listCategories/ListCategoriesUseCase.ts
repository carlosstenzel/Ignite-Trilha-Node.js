import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {
    constructor( 
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository) {}
    
    async execute(): Promise<Category[]> {

        return await this.categoriesRepository.list();
    }

}

export { ListCategoriesUseCase };
import { CategoryListDto } from './dto/category.dto';
import { CategoryRepository } from './category.repository';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    getCategories(): Promise<CategoryListDto>;
}

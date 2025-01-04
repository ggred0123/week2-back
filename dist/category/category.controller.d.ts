import { CategoryService } from './category.service';
import { CategoryListDto } from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategories(): Promise<CategoryListDto>;
}

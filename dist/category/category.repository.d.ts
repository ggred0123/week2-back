import { PrismaService } from '../common/services/prisma.service';
import { CategoryData } from './type/category-data.type';
export declare class CategoryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCategories(): Promise<CategoryData[]>;
}

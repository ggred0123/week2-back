import { CategoryData } from '../type/category-data.type';
export declare class CategoryDto {
    id: number;
    name: string;
    static from(data: CategoryData): CategoryDto;
    static fromArray(data: CategoryData[]): CategoryDto[];
}
export declare class CategoryListDto {
    categories: CategoryDto[];
    static from(data: CategoryData[]): CategoryListDto;
}

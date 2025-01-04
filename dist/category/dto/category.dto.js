"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryListDto = exports.CategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CategoryDto {
    static from(data) {
        return {
            id: data.id,
            name: data.name,
        };
    }
    static fromArray(data) {
        return data.map(CategoryDto.from);
    }
}
exports.CategoryDto = CategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '카테고리 ID',
        type: Number,
    }),
    __metadata("design:type", Number)
], CategoryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '카테고리 이름',
        type: String,
    }),
    __metadata("design:type", String)
], CategoryDto.prototype, "name", void 0);
class CategoryListDto {
    static from(data) {
        return {
            categories: CategoryDto.fromArray(data),
        };
    }
}
exports.CategoryListDto = CategoryListDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '카테고리 목록',
        type: [CategoryDto],
    }),
    __metadata("design:type", Array)
], CategoryListDto.prototype, "categories", void 0);
//# sourceMappingURL=category.dto.js.map
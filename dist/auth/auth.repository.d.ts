import { PrismaService } from "../common/services/prisma.service";
import { UserBaseInfo } from "./type/user-base-info.type";
import { Category } from "@prisma/client";
import { SignUpData } from "./type/sign-up-data.type";
import { UpdateUserData } from "./type/update-user-data.type";
export declare class AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(data: SignUpData): Promise<UserBaseInfo>;
    updateUser(id: number, data: UpdateUserData): Promise<UserBaseInfo>;
    getUserById(id: number): Promise<UserBaseInfo | null>;
    getUserByEmail(email: string): Promise<UserBaseInfo | null>;
    getCategoryById(id: number): Promise<Category | null>;
}

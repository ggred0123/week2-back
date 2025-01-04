import { PrismaService } from "../common/services/prisma.service";
import { UpdateUserData } from "../auth/type/update-user-data.type";
import { UserData } from "./type/user-data.type";
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserById(userId: number): Promise<UserData | null>;
    updateUser(userId: number, data: UpdateUserData): Promise<UserData>;
    isEmailExist(email: string): Promise<boolean>;
}

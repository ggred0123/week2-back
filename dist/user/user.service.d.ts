import { UserRepository } from "./user.repository";
import { UserBaseInfo } from "../auth/type/user-base-info.type";
import { UserDto } from "./dto/user.dto";
import { UpdateUserPayload } from "./payload/update-user.payload";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getUserById(userId: number): Promise<UserDto>;
    updateUser(userId: number, payload: UpdateUserPayload, user: UserBaseInfo): Promise<UserDto>;
    private validateNullOf;
}

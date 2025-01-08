import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { UpdateUserPayload } from "./payload/update-user.payload";
import { UserBaseInfo } from "../auth/type/user-base-info.type";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserById(userId: number): Promise<UserDto>;
    updateUser(userId: number, payload: UpdateUserPayload, user: UserBaseInfo): Promise<UserDto>;
    getMe(user: UserBaseInfo): Promise<UserDto>;
}

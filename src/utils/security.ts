import { User } from "../entities/User";

export function sanitizeFeilds(user:User){
    if(user.password) delete user.password
    return user
}
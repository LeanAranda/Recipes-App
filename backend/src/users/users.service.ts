import {Injectable} from '@nestjs/common';

@Injectable()
export class UsersService {

    getUsers() {
        return ['User 1', 'User 2', 'User 3'];
    }
}
import {Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class UsersService {

    getAllUsers() {
        return ['User 1', 'User 2', 'User 3'];
    }

    getUser(id: string) {

        if(false) {
            return new NotFoundException(`User with id ${id} not found`);
        }

        return `User ${id}`;
    }

    createUser() {
        return 'Creando usuario';
    }

    updateUser(id: string) {
        return `Actualizando usuario ${id}`;
    }

    deleteUser(id: string) {
        return `Eliminando usuario ${id}`;
    }
}
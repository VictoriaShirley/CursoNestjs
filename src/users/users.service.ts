import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync as bcryptHashSync} from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {    
    private readonly users: UserDto[] = []

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) {}

    async create(newUser: UserDto){
        const userAlredyRegistred = await this.findByEmail(newUser.email);

        if (userAlredyRegistred){
            throw new ConflictException(`Email '${newUser.email}' already registered`);
        }

        const dbUser = new UserEntity();
        dbUser.username = newUser.username;
        dbUser.email = newUser.email;
        dbUser.passwordHash = bcryptHashSync(newUser.password, 10);

        const {id, username} = await this.usersRepository.save(dbUser);

        return {id, username};
    }

    async findByEmail(email: string): Promise<UserDto | null> {
        const userFound = await this.usersRepository.findOne({
            where: { email }
        });

        if (!userFound) {
            return null;  // Retorna null quando o usuário não é encontrado
        }

        return {
            id: userFound.id,
            email: userFound.email,
            username: userFound.username,
            password: userFound.passwordHash
        };
    }

    async findAll(): Promise<UserDto[]> {
        const users = await this.usersRepository.find();

        return users.map(user => ({
            id: user.id,
            email: user.email,
            username: user.username,
            password: user.passwordHash,
        }));
    }

    async findById(id: string): Promise<UserDto> {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            throw new HttpException(`User with ${id} not found`, HttpStatus.NOT_FOUND);        
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            password: user.passwordHash,
        };
    }


    async update(id: string, updateUserDto: UserDto) {
        const user = await this.findById(id);

        if (!user) {
            throw new HttpException(`User with ${id} not found`, HttpStatus.NOT_FOUND);        
        }  
        
        const updatedUser = { ...user, ...updateUserDto };

        // Atualiza apenas os campos modificados
        if (updateUserDto.email) {
            updatedUser.email = updateUserDto.email;
        }
        if (updateUserDto.username) {
            updatedUser.username = updateUserDto.username;
        }
        if (updateUserDto.password) {
            updatedUser.password = bcryptHashSync(updateUserDto.password, 10);
        }

        await this.usersRepository.save(updatedUser);

        return updatedUser;
    }

    async delete(id: string): Promise<void> {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new HttpException(`User with ${id} not found`, HttpStatus.NOT_FOUND);        
        }
    }
    
}

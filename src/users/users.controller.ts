import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    create(@Body() user: UserDto){
        this.usersService.create(user);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string) {
        return await this.usersService.findByEmail(email);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        this.usersService.delete(id);
    }
}

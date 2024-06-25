import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './db/entities/user.entity';
import { TaskEntity } from './db/entities/task.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(), // Importe ConfigModule e configure-o, se ainda não estiver
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importe ConfigModule para garantir que o ConfigService seja injetado
      useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [UserEntity, TaskEntity],
      synchronize: true, // Habilita a sincronização automática do TypeORM (cuidado em produção)
    }),
    inject: [ConfigService],
  }),
  TypeOrmModule.forFeature([UserEntity, TaskEntity]), // Importa os repositórios do TypeORM
    JwtModule.registerAsync({ // Configuração do JwtModule para gerenciar tokens JWT
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Chave secreta para assinar tokens JWT
        signOptions: { expiresIn: `${configService.get<number>('JWT_EXPIRATION_TIME')}s` }, // Tempo de expiração dos tokens JWT
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, UsersController], // Adiciona os controladores
  providers: [AuthService, UsersService], // Adiciona os serviços
})
export class AppModule {}

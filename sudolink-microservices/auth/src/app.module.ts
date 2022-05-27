import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './auth/auth.controller';
import { UserModule } from './auth/auth.module';
import { UserService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'AUTH_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'auth',
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'auth-consumer'
    //       }
    //     }
    //   }
    // ]),
    UserModule,
    ConfigModule.forRoot({

    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI 
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas';
import { UserController } from './auth.controller';
import { UserService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 'name': 'user', schema: UserSchema}
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

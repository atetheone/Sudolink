import { ForbiddenException, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto, UserCreateDto } from 'src/dtos';
import { UserModel } from 'src/schemas';
import * as argon from 'argon2';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('user') private UserModel: Model<UserModel>
    ) {

    }

    getUsers() {
        return [10, 11];
    }

    async register(dto: UserCreateDto) {
        // generate hash password
        const hash = await argon.hash(dto.password);
        
        let error_ = false;
        const user = await this.UserModel.findOne(
            {username: dto.username},
            { __v: 0, _id: 0 }
        );

        if (user) {
            console.log({Error: 'Credentials taken'});
            throw new ForbiddenException('User exists already');
        } else {
            dto.password = hash;
            dto['creationTime'] = new Date().toISOString();
            const newUser = new this.UserModel(dto);
            let userRes;
            
            await newUser.save()
                .then(
                    (userCreated) => {
                        if (userCreated) {
                            //delete data.password;
                            console.log(`User added:\n${JSON.stringify(userCreated, null, 3)}`);
                            userRes = {};
                            userRes['username'] = userCreated.username;
                            userRes['email'] = userCreated.email;
                            userRes['creationTime'] = userCreated.creationTime;
                            

                            console.log(`User added:\n${JSON.stringify(userRes, null, 3)}`);
                        }
                    }
                ).catch(
                    (error) => {
                        if (error) {
                            console.log({ Error: error });
                            error_ = true;
                            // return {Error: 'Something went bad!!'}
                            userRes =  new HttpException('error of request', HttpStatus.BAD_REQUEST);
                        }
                    }
                );
            return userRes;
        }
    }


    async login(dto: AuthDto) {
        // let res: any;
        const user = await this.UserModel.findOne( 
            {username: dto.username}, { __v: 0, _id: 0 }
        );

        if (!user) {
            console.log({Error: 'User does not exist!!'});
            // return { error: 'Invalid inputs' }
            //throw new ForbiddenException('Credentials taken');
            throw new HttpException('User not found', HttpStatus.FORBIDDEN)
        } 
        const matches = await argon.verify(user.password, dto.password);

        if (!matches) {
            console.log({Error: 'Invalid password!!'});
            throw new ForbiddenException('Invalid inputs');
        }
        delete user.password;
        return user;
       
        
        
    }
}
 
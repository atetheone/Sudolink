import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class UserModel {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;
    
    @Prop({ required: true })
    creationTime: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
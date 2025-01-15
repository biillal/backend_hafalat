
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({
        type: String,
        required: true,
        minlength: [3, 'UserName must be at least 3 caracters'],
        maxlength: [30, 'UserName must be at most 30 caracters'],
    })
    userName: string;

    @Prop({
        type: String,
        required: true,
        unique: true
    })
    email: string;

    @Prop({
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters'],
    })
    password: string;

    @Prop({
        type: Number,
    })
    age: number;



    @Prop({
        type: String,
        required: true,
        enum: ['user', "admin", "owner_salle"],
        default:"user"
    })
    role: string;

    @Prop({
        type: String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6LXNJFTmLzCoExghcATlCWG85kI8dsnhJng&s'
    })
    avatar: string

    @Prop({
        type: String

    })
    verificationCode: string

    @Prop({
        type: Boolean,
        enum: [false, true]
    })
    active: boolean

    @Prop({
        type: String,
        enum: ['male', "female"]
    })
    gender: string
}

export const UserSchema = SchemaFactory.createForClass(User);

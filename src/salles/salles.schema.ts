
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Double, HydratedDocument, Types } from 'mongoose';

export type SallesDocument = HydratedDocument<Salles>;

@Schema({ timestamps: true })
export class Salles {
    @Prop({ required: true })
    name: string;

    @Prop({
        type: String,
        required: true,
    })
    description: string;

    @Prop({ required: true })
    capacity: number;

    @Prop({
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    })
    localisation: {
        type: string;
        coordinates: [number, number];
    };

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    owner: Types.ObjectId;

    @Prop({ default: true })
    isAvailable: boolean;

    @Prop({ type: [String], default: [] })
    equipment: string[];

    @Prop({ type: Number })
    space: number;


    @Prop({ type: [String], default: [] })
    images: string[];

    @Prop({
        type: Number
    })
    priceParJour: number;

    @Prop({
        type: Number
    })
    priceParDemiJour: number;

    @Prop({
        type: String,
        required: true,
        enum: ['fammes', "hommes", "Les deux"],
    })
    nombreDesSalles: string


}

export const SallesSchema = SchemaFactory.createForClass(Salles);
SallesSchema.index({ localisation: '2dsphere' });

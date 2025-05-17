import { RewardType } from '@app/database/enums/reward.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema({ timestamps: true })
export class Reward {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Event' })
  eventId: Types.ObjectId;

  @Prop({ enum: RewardType, required: true })
  type: `${RewardType}`;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);

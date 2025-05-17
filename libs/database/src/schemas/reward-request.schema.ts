import { RewardRequestStatus } from '@app/database/enums/reward-request.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RewardRequestDocument = RewardRequest & Document;

@Schema({ timestamps: true })
export class RewardRequest {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Event' })
  eventId: Types.ObjectId;

  @Prop({ required: true })
  conditionMet: boolean;

  @Prop({ enum: RewardRequestStatus, default: RewardRequestStatus.PENDING })
  status: `${RewardRequestStatus}`;

  @Prop()
  failureReason?: string;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);

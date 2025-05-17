import { EventStatus } from '@app/database/enums/event.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  conditionType: string; // 예: LOGIN_DAYS, INVITE_FRIENDS 등

  @Prop({ required: true })
  conditionValue: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ enum: EventStatus, default: EventStatus.ACTIVE })
  status: `${EventStatus}`;
}

export const EventSchema = SchemaFactory.createForClass(Event);

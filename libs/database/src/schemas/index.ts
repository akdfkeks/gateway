import { ModelDefinition } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Event, EventSchema } from './event.schema';
import { Reward, RewardSchema } from './reward.schema';
import { RewardRequest, RewardRequestSchema } from './reward-request.schema';

export const mongooseSchemas: ModelDefinition[] = [
  { name: User.name, schema: UserSchema },
  { name: Event.name, schema: EventSchema },
  { name: Reward.name, schema: RewardSchema },
  { name: RewardRequest.name, schema: RewardRequestSchema },
];

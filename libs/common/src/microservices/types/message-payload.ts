import { Actor } from './actor';

export interface MessagePayload<T = any> {
  data: T;
  actor: Actor;
}

import { Error } from 'mongoose';

export class InvalidArgumentException extends Error {
  constructor(message: string) {
    super(message);
  }
}

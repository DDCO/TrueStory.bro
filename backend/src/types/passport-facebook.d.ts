declare module 'passport-facebook' {
  import { Strategy as PassportStrategy } from 'passport';
  export class Strategy extends PassportStrategy {
    constructor(options: object, verify: (...args: unknown[]) => void);
  }
}

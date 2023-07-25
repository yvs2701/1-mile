import type { DefaultUser } from 'next-auth';

// add id to session's user's data
declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}
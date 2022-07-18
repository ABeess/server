import { Request, Response } from 'express'
import { Session, SessionData } from 'express-session'

export class Context {
  req: Request & Session & Partial<SessionData> & { userId?: string }
  res: Response
}

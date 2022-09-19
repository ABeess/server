import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import AppDataSource from './lib/DataSource';
import baseRouter from './routes/baseApi';
import connectRedis from 'connect-redis';
import cors from 'cors';
import http from 'http';
import socketIo from './socket';
import redis from './utils/redis';
import passport from './lib/passport';

const main = async () => {
  const app = express();

  const RedisStore = connectRedis(session);

  await AppDataSource.connect();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: 'http://localhost:3090',
      credentials: true,
    })
  );
  app.use(
    session({
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      },
      store: new RedisStore({ client: redis }),
      secret: String(process.env.SESSION_SECRET),
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/', async (_req, res) => {
    res.send('Hello');
  });
  app.use('/api', baseRouter);

  const httpServer = http.createServer(app);

  socketIo(httpServer);

  const PORT = process.env.PORT || 3080;

  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}: http://localhost:${PORT}`);
  });
};

main().catch((error) => {
  console.log('Server starting error:', error);
});

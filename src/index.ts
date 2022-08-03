import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import AppDataSource from './lib/DataSource';
import baseRouter from './routes/baseApi';
import * as redis from 'redis';
import connectRedis from 'connect-redis';
import cors from 'cors';
import http from 'http';
import socketIo from './socket';

const main = async () => {
  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({ legacyMode: true });

  await AppDataSource.connect();
  await redisClient.connect();

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
      store: new RedisStore({ client: redisClient }),
      secret: String(process.env.SESSION_SECRET),
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use('/api', baseRouter);

  app.use('/', (_req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

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

import { StatusCodes } from 'http-status-codes';
import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userInfoRepository from '../repository/userInfoRepository';
import userRepository from '../repository/userRepository';
import { IOAuthResponse } from '../types/responseType';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = (profile.emails && profile.emails[0] && profile.emails[0].value) as string;
        const name = profile.name;
        const photos = profile.photos && profile.photos[0] && profile.photos[0].value;
        const existingUser = await userRepository.findOne({ email });
        const isProvider = existingUser && existingUser.provider === 'google';
        if (existingUser && isProvider) {
          return done(null, existingUser);
        } else if (!existingUser) {
          const userGoogle = await userRepository.create({
            email,
            password: process.env.OAUTH_PASSWORD_DEFAULT as string,
            googleId: profile.id,
            provider: 'google',
          });
          await userInfoRepository.create({
            firstName: name?.familyName,
            lastName: name?.givenName,
            avatar: photos,
            user: userGoogle,
          });
          return done(null, userGoogle);
        }
        return done(null, {
          code: StatusCodes.CONFLICT,
          message: `User with email ${email} already exists`,
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK_URL as string,
      scope: ['user:email', 'profile'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = (profile.emails && profile.emails[0] && profile.emails[0].value) as string;
        if (!email) {
          return done(null, {
            code: StatusCodes.BAD_REQUEST,
            message: 'Please make your email public on github profile',
          });
        }
        const photos = profile.photos && profile.photos[0] && profile.photos[0].value;
        const existingUser = await userRepository.findOne({ email });
        const isProvider = existingUser && existingUser.provider === 'github';
        if (existingUser && isProvider) {
          return done(null, existingUser);
        } else if (!existingUser) {
          const userGithub = await userRepository.create({
            email,
            password: process.env.OAUTH_PASSWORD_DEFAULT as string,
            githubId: profile.id,
            provider: 'github',
          });
          await userInfoRepository.create({
            lastName: profile.displayName,
            avatar: photos,
            user: userGithub,
          });
          return done(null, userGithub);
        }
        return done(null, {
          code: StatusCodes.CONFLICT,
          message: `User with email ${email} already exists`,
        });
      } catch (error) {
        done(null, error);
      }
    }
  )
);

passport.serializeUser((data, done) => {
  done(null, data);
});
passport.deserializeUser(async (data: IOAuthResponse, done) => {
  try {
    if (data.code) {
      return done(null, data);
    } else {
      const user = await userRepository.findOne(
        { id: data.id },
        {
          relations: ['userInfo'],
        }
      );
      done(null, user);
    }
  } catch (error) {
    done(null, error);
  }
});

export default passport;

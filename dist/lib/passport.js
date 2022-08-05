"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const passport_1 = __importDefault(require("passport"));
const passport_github_1 = require("passport-github");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const userInfoRepository_1 = __importDefault(require("../repository/userInfoRepository"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const email = (profile.emails && profile.emails[0] && profile.emails[0].value);
        const name = profile.name;
        const photos = profile.photos && profile.photos[0] && profile.photos[0].value;
        const existingUser = await userRepository_1.default.findOne({ email });
        const isProvider = existingUser && existingUser.provider === 'google';
        if (existingUser && isProvider) {
            return done(null, existingUser);
        }
        else if (!existingUser) {
            const userGoogle = await userRepository_1.default.create({
                email,
                password: process.env.OAUTH_PASSWORD_DEFAULT,
                googleId: profile.id,
                provider: 'google',
            });
            await userInfoRepository_1.default.create({
                firstName: name === null || name === void 0 ? void 0 : name.familyName,
                lastName: name === null || name === void 0 ? void 0 : name.givenName,
                avatar: photos,
                user: userGoogle,
            });
            return done(null, userGoogle);
        }
        return done(null, {
            code: http_status_codes_1.StatusCodes.CONFLICT,
            message: `User with email ${email} already exists`,
        });
    }
    catch (error) {
        done(error);
    }
}));
passport_1.default.use(new passport_github_1.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email', 'profile'],
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const email = (profile.emails && profile.emails[0] && profile.emails[0].value);
        if (!email) {
            return done(null, {
                code: http_status_codes_1.StatusCodes.BAD_REQUEST,
                message: 'Please make your email public on github profile',
            });
        }
        const photos = profile.photos && profile.photos[0] && profile.photos[0].value;
        const existingUser = await userRepository_1.default.findOne({ email });
        const isProvider = existingUser && existingUser.provider === 'github';
        if (existingUser && isProvider) {
            return done(null, existingUser);
        }
        else if (!existingUser) {
            const userGithub = await userRepository_1.default.create({
                email,
                password: process.env.OAUTH_PASSWORD_DEFAULT,
                githubId: profile.id,
                provider: 'github',
            });
            await userInfoRepository_1.default.create({
                lastName: profile.displayName,
                avatar: photos,
                user: userGithub,
            });
            return done(null, userGithub);
        }
        return done(null, {
            code: http_status_codes_1.StatusCodes.CONFLICT,
            message: `User with email ${email} already exists`,
        });
    }
    catch (error) {
        done(null, error);
    }
}));
passport_1.default.serializeUser((data, done) => {
    done(null, data);
});
passport_1.default.deserializeUser(async (data, done) => {
    try {
        if (data.code) {
            return done(null, data);
        }
        else {
            const user = await userRepository_1.default.findOne({ id: data.id }, {
                relations: ['userInfo'],
            });
            done(null, user);
        }
    }
    catch (error) {
        done(null, error);
    }
});
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map
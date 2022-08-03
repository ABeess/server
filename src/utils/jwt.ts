import JWT, { Secret } from 'jsonwebtoken';
import { User } from '../entities/User';

class JWTManager {
  generateAccessToken(user: User) {
    return JWT.sign({ id: user.id }, process.env.JWT_ACCESSTOKEN_SECRET as Secret, { expiresIn: '10m' });
  }
  generateRefreshToken(user: User) {
    return JWT.sign({ id: user.id }, process.env.JWT_REFRESHTOKEN_SECRET as Secret, { expiresIn: '30d' });
  }
}

export default new JWTManager();

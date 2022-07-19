import JWT, { Secret } from 'jsonwebtoken'
import { User } from '../entities/User'

class JWTManager {
  genarateAccessToken(user: User) {
    return JWT.sign({ id: user.id }, process.env.JWT_ACCESSTOKEN_SECRET as Secret, { expiresIn: '10m' })
  }
  genarateRefreshToken(user: User) {
    return JWT.sign({ id: user.id }, process.env.JWT_REFRESHTOKEN_SECRET as Secret, { expiresIn: '30d' })
  }
}

export default new JWTManager()

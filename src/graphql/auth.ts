import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../entities/user.entity.js'
 
export async function authenticateUser(request: Request) {
  const header = request.headers.get('Authorization')
  console.log(header)
  if (header !== null) {
    const token = header.split(' ')[1]
    const tokenPayload = jwt.verify(token, process.env.SECRET) as JwtPayload
    const userId = tokenPayload.userId

    const user = await User.findById(userId)

    return user.access ? user : null
  }
  return null
}
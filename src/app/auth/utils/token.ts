import JWT from 'jsonwebtoken'

interface UserTokenPayload{
    id:string
}
const JWT_SECRET ='myjwtsecret'
export function createUserToken(payload:UserTokenPayload){
    return JWT.sign(payload,JWT_SECRET)
}
export function verifyUserToken(token:string){
   const payload= JWT.verify(token,JWT_SECRET) as UserTokenPayload
   return payload
}

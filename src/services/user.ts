import { prismaClient } from '../lib/db';
import { createHmac, randomBytes } from 'crypto';
import JWT from 'jsonwebtoken';

const JWT_SECRET = "a5fasdf6asd6f5"

export interface CreateUserPayload {
    firstName: string
    lastName?: string
    email: string
    password: string
}

export interface GetUserTokenPayload {
    email: string
    password: string
}

class UserService {
    private static generateHash(salt: string, password: string) {
        return createHmac('sha256', salt).update(password).digest('hex');
    }

    public static createUser(payload: CreateUserPayload) {
        const {firstName, lastName, email, password} = payload
        const salt = randomBytes(32).toString('hex')
        const hashedPassword = this.generateHash(salt, password)

        return prismaClient.user.create({
            data : {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword,
            }
        });
    }

    public static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({where: { email }})
    }

    public static async getUserToken(payload: GetUserTokenPayload) {
        const {email, password} = payload

        const user = await this.getUserByEmail(email)
        if(!user) {
            throw new Error("User not found")
        }

        const salt = user.salt
        const hashedPassword = this.generateHash(salt, password)

        if(user.password !== hashedPassword) {
            throw new Error("Incorrect Password")
        }

        const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET)
        return token
    }

    public static decodeJWT(token: string) {
        return JWT.verify(token, JWT_SECRET);
    }

    public static getUserById(id: string) {
        return prismaClient.user.findUnique({where: { id }})
    }
}

export default UserService
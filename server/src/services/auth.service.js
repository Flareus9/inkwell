// server/src/services/auth.service.js (excerpt, refactor)
// Section 4.5's "Magic Numbers" anti-pattern, corrected: the bcrypt
// cost factor and minimum password length are now named constants,
// not bare literals a future reader would have to guess the meaning of.
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository.js";
import { assertNonEmpty, ValidationError } from "../utils/validation.js";
import { TokenService } from "./token.service.js";
class EmailAlreadyRegisteredError extends Error {}
class WeakPasswordError extends Error {}
class InvalidCredentialsError extends Error {}
const BCRYPT_COST_FACTOR = 10; // see Lecture 15 for the security tradeoff this number encodes
const MIN_PASSWORD_LENGTH = 8;

function toPublicUser(user) {
    const { passwordHash, ...publicUser } = user;
    return publicUser;
}

export const AuthService = {
    async register({ email, displayName, password }) {
        assertNonEmpty(email, "email", "MISSING_EMAIL");
        assertNonEmpty(displayName, "displayName", "MISSING_DISPLAY_NAME");
        assertNonEmpty(password, "password", "MISSING_PASSWORD");
        const existing = await UserRepository.findByEmail(email);
        if (existing) {
            throw new EmailAlreadyRegisteredError();
        }
    if (password.length < MIN_PASSWORD_LENGTH) {
        throw new WeakPasswordError();
    }
    const passwordHash = await bcrypt.hash(password, BCRYPT_COST_FACTOR);
    let user;
    try {
        user = await UserRepository.create({ email, displayName, passwordHash });
    } catch (err) {
    // Defense in depth (Lecture 4): the DB's @unique
    // constraint may reject a race-condition duplicate that slipped
    // past the check above.
        throw new EmailAlreadyRegisteredError();
    }
    const tokens = TokenService.issueTokens(user);
        return { user: toPublicUser(user), ...tokens };
    },
    async login({ email, password }) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
        throw new InvalidCredentialsError();
    }
    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
        throw new InvalidCredentialsError();
    }
    const tokens = TokenService.issueTokens(user);
        return { user: toPublicUser(user), ...tokens };
    },
};
export { EmailAlreadyRegisteredError, WeakPasswordError, InvalidCredentialsError, ValidationError };
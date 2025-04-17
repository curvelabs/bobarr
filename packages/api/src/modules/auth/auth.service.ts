import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { sign, verify } from 'jsonwebtoken';

import { ParamsService } from 'src/modules/params/params.service';
import { ParameterKey } from 'src/app.dto';

// Use a default JWT secret if none is provided in params
const DEFAULT_JWT_SECRET = 'bobarr-settings-secret';
// Token expiration in 7 days
const TOKEN_EXPIRATION = '7d';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly paramsService: ParamsService) { }

    /**
     * Authenticate with password
     */
    async authenticate(password: string): Promise<{ success: boolean; token?: string; message?: string }> {
        try {
            const storedPassword = await this.paramsService.get(ParameterKey.ADMIN_PASSWORD);

            // If no password has been set, use TMDB_API_KEY as default password
            // This ensures there's always a way to access settings
            if (!storedPassword) {
                const tmdbApiKey = await this.paramsService.get(ParameterKey.TMDB_API_KEY);
                if (password === tmdbApiKey) {
                    // First-time login with default password - let's set a proper password
                    const hashedPassword = this.hashPassword(password);
                    await this.paramsService.save(ParameterKey.ADMIN_PASSWORD, hashedPassword);
                    return {
                        success: true,
                        token: await this.generateToken(),
                        message: 'Default password accepted. For security, please change it in settings.'
                    };
                }
                return { success: false, message: 'Invalid password' };
            }

            // Normal password check
            const hashedPassword = this.hashPassword(password);
            if (hashedPassword !== storedPassword) {
                return { success: false, message: 'Invalid password' };
            }

            return { success: true, token: await this.generateToken() };
        } catch (error) {
            this.logger.error('Authentication error', error);
            return { success: false, message: 'Authentication error occurred' };
        }
    }

    /**
     * Verify token
     */
    async verifyToken(token: string): Promise<boolean> {
        try {
            const secret = await this.getJwtSecret();
            verify(token, secret);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Generate JWT token
     */
    private async generateToken(): Promise<string> {
        const secret = await this.getJwtSecret();
        return sign({ auth: true, timestamp: Date.now() }, secret, { expiresIn: TOKEN_EXPIRATION });
    }

    /**
     * Get JWT secret from params or use default
     */
    private async getJwtSecret(): Promise<string> {
        try {
            const secret = await this.paramsService.get(ParameterKey.JWT_SECRET);
            if (!secret) {
                // Create and save a random JWT secret if none exists
                const newSecret = crypto.randomBytes(32).toString('hex');
                await this.paramsService.save(ParameterKey.JWT_SECRET, newSecret);
                return newSecret;
            }
            return secret;
        } catch (error) {
            this.logger.warn('Could not get JWT secret from params, using default', error);
            return DEFAULT_JWT_SECRET;
        }
    }

    /**
     * Simple password hashing
     */
    private hashPassword(password: string): string {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
}
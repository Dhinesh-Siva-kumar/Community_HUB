import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
interface UserForTokens {
    id: string;
    email: string;
    role: string;
}
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    register(dto: RegisterDto): Promise<{
        user: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            country: string;
            location: string | null;
            pincode: string | null;
            interests: string[];
            professionalCategory: string | null;
            id: string;
            avatar: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            bio: string | null;
            isTrusted: boolean;
            isBlocked: boolean;
            isActive: boolean;
            profileCompletion: number;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            country: string;
            location: string | null;
            pincode: string | null;
            interests: string[];
            professionalCategory: string | null;
            id: string;
            avatar: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            bio: string | null;
            isTrusted: boolean;
            isBlocked: boolean;
            isActive: boolean;
            profileCompletion: number;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    adminLogin(dto: LoginDto): Promise<{
        user: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            country: string;
            location: string | null;
            pincode: string | null;
            interests: string[];
            professionalCategory: string | null;
            id: string;
            avatar: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            bio: string | null;
            isTrusted: boolean;
            isBlocked: boolean;
            isActive: boolean;
            profileCompletion: number;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    validateUser(email: string, password: string): Promise<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        country: string;
        location: string | null;
        pincode: string | null;
        interests: string[];
        professionalCategory: string | null;
        id: string;
        avatar: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        bio: string | null;
        isTrusted: boolean;
        isBlocked: boolean;
        isActive: boolean;
        profileCompletion: number;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    generateTokens(user: UserForTokens): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getProfile(userId: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        country: string;
        location: string | null;
        pincode: string | null;
        interests: string[];
        professionalCategory: string | null;
        id: string;
        avatar: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        bio: string | null;
        isTrusted: boolean;
        isBlocked: boolean;
        isActive: boolean;
        profileCompletion: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};

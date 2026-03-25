import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    refreshToken(refreshToken: string): Promise<{
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

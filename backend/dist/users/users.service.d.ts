import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        communities: ({
            community: {
                location: string | null;
                pincode: string | null;
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                image: string | null;
                createdById: string;
            };
        } & {
            id: string;
            userId: string;
            communityId: string;
            joinedAt: Date;
        })[];
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
    updateProfile(userId: string, data: UpdateUserDto): Promise<{
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
    private calculateProfileCompletion;
    getUsers(page: number, limit: number, search?: string): Promise<{
        data: {
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
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    blockUser(userId: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        id: string;
        isBlocked: boolean;
    }>;
    unblockUser(userId: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        id: string;
        isBlocked: boolean;
    }>;
    trustUser(userId: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        id: string;
        isTrusted: boolean;
    }>;
    untrustUser(userId: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        id: string;
        isTrusted: boolean;
    }>;
    getDashboardStats(userId: string, role: string): Promise<{
        totalUsers: number;
        totalCommunities: number;
        totalPosts: number;
        pendingPosts: number;
        totalBusinesses: number;
        totalEvents: number;
        totalJobs: number;
        joinedCommunities?: undefined;
        userPosts?: undefined;
        userBusinesses?: undefined;
        userEvents?: undefined;
        userJobs?: undefined;
    } | {
        joinedCommunities: number;
        userPosts: number;
        userBusinesses: number;
        userEvents: number;
        userJobs: number;
        totalUsers?: undefined;
        totalCommunities?: undefined;
        totalPosts?: undefined;
        pendingPosts?: undefined;
        totalBusinesses?: undefined;
        totalEvents?: undefined;
        totalJobs?: undefined;
    }>;
}

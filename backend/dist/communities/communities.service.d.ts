import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCommunityDto } from './dto/create-community.dto.js';
export declare class CommunitiesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCommunityDto, adminId: string): Promise<{
        createdBy: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
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
    }>;
    findAll(params: {
        page: number;
        limit: number;
        search?: string;
        pincode?: string;
    }): Promise<{
        data: ({
            _count: {
                posts: number;
                members: number;
            };
            createdBy: {
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
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
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        _count: {
            posts: number;
            members: number;
        };
        createdBy: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
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
    }>;
    update(id: string, data: Partial<CreateCommunityDto>): Promise<{
        _count: {
            posts: number;
            members: number;
        };
    } & {
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
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
    join(communityId: string, userId: string): Promise<{
        message: string;
    }>;
    leave(communityId: string, userId: string): Promise<{
        message: string;
    }>;
    getMembers(communityId: string, page: number, limit: number): Promise<{
        data: ({
            user: {
                email: string;
                firstName: string;
                lastName: string;
                professionalCategory: string | null;
                id: string;
                avatar: string | null;
            };
        } & {
            id: string;
            userId: string;
            communityId: string;
            joinedAt: Date;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}

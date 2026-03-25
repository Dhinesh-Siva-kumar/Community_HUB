import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBusinessDto, CreateBusinessCategoryDto } from './dto/create-business.dto.js';
export declare class BusinessService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCategory(data: CreateBusinessCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        icon: string | null;
    }>;
    getCategories(): Promise<({
        _count: {
            businesses: number;
        };
    } & {
        id: string;
        createdAt: Date;
        name: string;
        icon: string | null;
    })[]>;
    create(data: CreateBusinessDto, userId: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
        };
        category: {
            id: string;
            createdAt: Date;
            name: string;
            icon: string | null;
        };
    } & {
        email: string | null;
        phone: string | null;
        country: string;
        location: string | null;
        pincode: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        description: string | null;
        images: string[];
        address: string | null;
        latitude: number | null;
        longitude: number | null;
        website: string | null;
        openingHours: string | null;
        categoryId: string;
    }>;
    findAll(params: {
        categoryId?: string;
        pincode?: string;
        page: number;
        limit: number;
        search?: string;
    }): Promise<{
        data: ({
            user: {
                firstName: string;
                lastName: string;
                id: string;
            };
            category: {
                id: string;
                createdAt: Date;
                name: string;
                icon: string | null;
            };
        } & {
            email: string | null;
            phone: string | null;
            country: string;
            location: string | null;
            pincode: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: string;
            description: string | null;
            images: string[];
            address: string | null;
            latitude: number | null;
            longitude: number | null;
            website: string | null;
            openingHours: string | null;
            categoryId: string;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        user: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
            avatar: string | null;
        };
        category: {
            id: string;
            createdAt: Date;
            name: string;
            icon: string | null;
        };
    } & {
        email: string | null;
        phone: string | null;
        country: string;
        location: string | null;
        pincode: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        description: string | null;
        images: string[];
        address: string | null;
        latitude: number | null;
        longitude: number | null;
        website: string | null;
        openingHours: string | null;
        categoryId: string;
    }>;
    update(id: string, data: Partial<CreateBusinessDto>, userId: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
        };
        category: {
            id: string;
            createdAt: Date;
            name: string;
            icon: string | null;
        };
    } & {
        email: string | null;
        phone: string | null;
        country: string;
        location: string | null;
        pincode: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        description: string | null;
        images: string[];
        address: string | null;
        latitude: number | null;
        longitude: number | null;
        website: string | null;
        openingHours: string | null;
        categoryId: string;
    }>;
    delete(id: string, userId: string): Promise<{
        message: string;
    }>;
}

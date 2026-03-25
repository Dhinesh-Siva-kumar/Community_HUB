import { PrismaService } from '../prisma/prisma.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
export declare class EventsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateEventDto, userId: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
            avatar: string | null;
        };
    } & {
        country: string;
        location: string | null;
        pincode: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        images: string[];
        address: string | null;
        title: string;
        eventDate: Date;
        eventTime: string | null;
    }>;
    findAll(params: {
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
                avatar: string | null;
            };
        } & {
            country: string;
            location: string | null;
            pincode: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            images: string[];
            address: string | null;
            title: string;
            eventDate: Date;
            eventTime: string | null;
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
    } & {
        country: string;
        location: string | null;
        pincode: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        images: string[];
        address: string | null;
        title: string;
        eventDate: Date;
        eventTime: string | null;
    }>;
    update(id: string, data: Partial<CreateEventDto>, userId: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
            avatar: string | null;
        };
    } & {
        country: string;
        location: string | null;
        pincode: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        images: string[];
        address: string | null;
        title: string;
        eventDate: Date;
        eventTime: string | null;
    }>;
    delete(id: string, userId: string): Promise<{
        message: string;
    }>;
}

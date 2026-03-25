import { EventsService } from './events.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(dto: CreateEventDto, userId: string): Promise<{
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
    findAll(pincode?: string, search?: string, page?: string, limit?: string): Promise<{
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
    update(id: string, dto: Partial<CreateEventDto>, userId: string): Promise<{
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

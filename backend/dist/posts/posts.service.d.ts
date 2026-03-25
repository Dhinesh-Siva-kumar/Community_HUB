import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
export declare class PostsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreatePostDto, userId: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
            avatar: string | null;
        };
        community: {
            id: string;
            name: string;
        };
        _count: {
            comments: number;
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.PostStatus;
        userId: string;
        communityId: string;
        content: string;
        type: import("@prisma/client").$Enums.PostType;
        images: string[];
    }>;
    findAll(params: {
        communityId?: string;
        type?: string;
        page: number;
        limit: number;
        isAdmin?: boolean;
    }): Promise<{
        data: ({
            user: {
                firstName: string;
                lastName: string;
                id: string;
                avatar: string | null;
            };
            community: {
                id: string;
                name: string;
            };
            _count: {
                comments: number;
                likes: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.PostStatus;
            userId: string;
            communityId: string;
            content: string;
            type: import("@prisma/client").$Enums.PostType;
            images: string[];
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findPending(page: number, limit: number): Promise<{
        data: ({
            user: {
                firstName: string;
                lastName: string;
                id: string;
                avatar: string | null;
            };
            community: {
                id: string;
                name: string;
            };
            _count: {
                comments: number;
                likes: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.PostStatus;
            userId: string;
            communityId: string;
            content: string;
            type: import("@prisma/client").$Enums.PostType;
            images: string[];
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    approve(postId: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.PostStatus;
        userId: string;
        communityId: string;
        content: string;
        type: import("@prisma/client").$Enums.PostType;
        images: string[];
    }>;
    reject(postId: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.PostStatus;
        userId: string;
        communityId: string;
        content: string;
        type: import("@prisma/client").$Enums.PostType;
        images: string[];
    }>;
    delete(postId: string, userId: string): Promise<{
        message: string;
    }>;
    like(postId: string, userId: string): Promise<{
        message: string;
        likeCount: number;
    }>;
    unlike(postId: string, userId: string): Promise<{
        message: string;
        likeCount: number;
    }>;
    getComments(postId: string, page: number, limit: number): Promise<{
        data: ({
            user: {
                firstName: string;
                lastName: string;
                id: string;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            content: string;
            postId: string;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    addComment(postId: string, userId: string, content: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        content: string;
        postId: string;
    }>;
    deleteComment(commentId: string, userId: string): Promise<{
        message: string;
    }>;
}

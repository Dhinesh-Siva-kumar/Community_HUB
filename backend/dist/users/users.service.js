"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                communities: {
                    include: { community: true },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const { password: _, refreshToken: __, ...userWithoutSensitive } = user;
        void _;
        void __;
        return userWithoutSensitive;
    }
    async updateProfile(userId, data) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data,
        });
        const profileCompletion = this.calculateProfileCompletion(user);
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: { profileCompletion },
        });
        const { password: _, refreshToken: __, ...userWithoutSensitive } = updatedUser;
        void _;
        void __;
        return userWithoutSensitive;
    }
    calculateProfileCompletion(user) {
        const fields = [
            user.firstName,
            user.lastName,
            user.email,
            user.phone,
            user.avatar,
            user.bio,
            user.location,
            user.pincode,
            user.interests.length > 0 ? 'filled' : null,
            user.professionalCategory,
        ];
        const filledFields = fields.filter((field) => field !== null && field !== undefined && field !== '').length;
        return Math.round((filledFields / fields.length) * 100);
    }
    async getUsers(page, limit, search) {
        const skip = (page - 1) * limit;
        const where = search
            ? {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    avatar: true,
                    role: true,
                    country: true,
                    location: true,
                    pincode: true,
                    interests: true,
                    professionalCategory: true,
                    bio: true,
                    isTrusted: true,
                    isBlocked: true,
                    isActive: true,
                    profileCompletion: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            data: users,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async blockUser(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: { isBlocked: true },
            select: { id: true, email: true, firstName: true, lastName: true, isBlocked: true },
        });
    }
    async unblockUser(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: { isBlocked: false },
            select: { id: true, email: true, firstName: true, lastName: true, isBlocked: true },
        });
    }
    async trustUser(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: { isTrusted: true },
            select: { id: true, email: true, firstName: true, lastName: true, isTrusted: true },
        });
    }
    async untrustUser(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: { isTrusted: false },
            select: { id: true, email: true, firstName: true, lastName: true, isTrusted: true },
        });
    }
    async getDashboardStats(userId, role) {
        if (role === 'ADMIN') {
            const [totalUsers, totalCommunities, totalPosts, pendingPosts, totalBusinesses, totalEvents, totalJobs,] = await Promise.all([
                this.prisma.user.count(),
                this.prisma.community.count(),
                this.prisma.post.count(),
                this.prisma.post.count({ where: { status: 'PENDING' } }),
                this.prisma.business.count(),
                this.prisma.event.count(),
                this.prisma.job.count(),
            ]);
            return {
                totalUsers,
                totalCommunities,
                totalPosts,
                pendingPosts,
                totalBusinesses,
                totalEvents,
                totalJobs,
            };
        }
        const [joinedCommunities, userPosts, userBusinesses, userEvents, userJobs,] = await Promise.all([
            this.prisma.communityMember.count({ where: { userId } }),
            this.prisma.post.count({ where: { userId } }),
            this.prisma.business.count({ where: { userId } }),
            this.prisma.event.count({ where: { userId } }),
            this.prisma.job.count({ where: { userId } }),
        ]);
        return {
            joinedCommunities,
            userPosts,
            userBusinesses,
            userEvents,
            userJobs,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map
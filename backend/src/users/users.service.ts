import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        communities: {
          include: { community: true },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password: _, refreshToken: __, ...userWithoutSensitive } = user;
    void _;
    void __;

    return userWithoutSensitive;
  }

  async updateProfile(userId: string, data: UpdateUserDto) {
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

  private calculateProfileCompletion(user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    bio: string | null;
    location: string | null;
    pincode: string | null;
    interests: string[];
    professionalCategory: string | null;
  }): number {
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

    const filledFields = fields.filter(
      (field) => field !== null && field !== undefined && field !== '',
    ).length;

    return Math.round((filledFields / fields.length) * 100);
  }

  async getUsers(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' as const } },
            { lastName: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
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

  async blockUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { isBlocked: true },
      select: { id: true, email: true, firstName: true, lastName: true, isBlocked: true },
    });
  }

  async unblockUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { isBlocked: false },
      select: { id: true, email: true, firstName: true, lastName: true, isBlocked: true },
    });
  }

  async trustUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { isTrusted: true },
      select: { id: true, email: true, firstName: true, lastName: true, isTrusted: true },
    });
  }

  async untrustUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { isTrusted: false },
      select: { id: true, email: true, firstName: true, lastName: true, isTrusted: true },
    });
  }

  async getDashboardStats(userId: string, role: string) {
    if (role === 'ADMIN') {
      const [
        totalUsers,
        totalCommunities,
        totalPosts,
        pendingPosts,
        totalBusinesses,
        totalEvents,
        totalJobs,
      ] = await Promise.all([
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

    const [
      joinedCommunities,
      userPosts,
      userBusinesses,
      userEvents,
      userJobs,
    ] = await Promise.all([
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
}

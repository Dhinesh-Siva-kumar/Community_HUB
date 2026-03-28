interface RegisterForm {
  userName: string;
  displayName: string;
  countryCode: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

export interface UserRegister {
  user_name: string;
  display_name: string;
  phone_no: string;
  password: string;
  country_id: number;
}

export interface Country {
  country_id: number;
  country_name: string;
  country_code: string;
  country_flag: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: 'ADMIN' | 'USER';
  country: string;
  location?: string;
  pincode?: string;
  interests: string[];
  professionalCategory?: string;
  bio?: string;
  isTrusted: boolean;
  isBlocked: boolean;
  isActive: boolean;
  profileCompletion: number;
  createdAt: string;
  updatedAt: string;
}

export interface Community {
  id: string;
  name: string;
  description?: string;
  image?: string;
  location?: string;
  pincode?: string;
  isActive: boolean;
  createdById: string;
  createdBy?: User;
  members?: CommunityMember[];
  _count?: {
    members: number;
    posts: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CommunityMember {
  id: string;
  userId: string;
  communityId: string;
  user?: User;
  community?: Community;
  joinedAt: string;
}

export type PostType = 'GENERAL' | 'HELP' | 'EMERGENCY';
export type PostStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Post {
  id: string;
  content: string;
  images: string[];
  type: PostType;
  status: PostStatus;
  communityId: string;
  userId: string;
  community?: Community;
  user?: User;
  comments?: Comment[];
  likes?: Like[];
  _count?: {
    comments: number;
    likes: number;
  };
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  id: string;
  postId: string;
  userId: string;
  user?: User;
  createdAt: string;
}

export interface BusinessCategory {
  id: string;
  name: string;
  icon?: string;
  _count?: {
    businesses: number;
  };
  createdAt: string;
}

export interface Business {
  id: string;
  name: string;
  description?: string;
  images: string[];
  address?: string;
  pincode?: string;
  country: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  openingHours?: string;
  categoryId: string;
  userId: string;
  category?: BusinessCategory;
  user?: User;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  images: string[];
  eventDate: string;
  eventTime?: string;
  address?: string;
  pincode?: string;
  location?: string;
  country: string;
  userId: string;
  user?: User;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  specification?: string;
  description?: string;
  images: string[];
  location?: string;
  pincode?: string;
  country: string;
  contactInfo?: string;
  salary?: string;
  jobType?: string;
  timing?: string;
  userId: string;
  user?: User;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
  relatedEntityId?: string;
  userId: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardStats {
  // Admin fields
  totalUsers?: number;
  totalCommunities?: number;
  totalPosts?: number;
  pendingApprovals?: number;
  pendingPosts?: number;
  totalBusinesses?: number;
  totalEvents?: number;
  totalJobs?: number;
  recentActivity?: any[];
  // User fields (returned by backend for USER role)
  joinedCommunities?: number;
  userPosts?: number;
  userBusinesses?: number;
  userEvents?: number;
  userJobs?: number;
}

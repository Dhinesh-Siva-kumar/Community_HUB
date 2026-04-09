import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Community, CommunityMember, CommunityRequest, PaginatedResponse } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NumberValueAccessor } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CommunityService {
  private api = inject(ApiService);
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getCommunities(params?: Record<string, any>): Observable<PaginatedResponse<Community>> {
    return this.api.get<PaginatedResponse<Community>>('/communities', params);
  }

  getCommunity(id: number): Observable<Community> {
    return this.http.get<Community>(`${this.baseUrl}/community/${id}`);
  }

  createCommunity(data: Partial<CommunityRequest>): Observable<Community> {
    return this.http.post<Community>(`${this.baseUrl}/create-community`, data).pipe();
  }

  updateCommunity(data: Partial<CommunityRequest>): Observable<Community> {
    return this.http.put<Community>(`${this.baseUrl}/update-community`, data);
  }

  deleteCommunity(id: number): Observable<void> {
    return this.api.delete<void>(`/communities/${id}`);
  }

  joinCommunity(data: Partial<any>): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/join-community`, data).pipe();
  }

  leaveCommunity(id: number): Observable<void> {
    return this.api.post<void>(`/communities/${id}/leave`);
  }

  getMembers(communityId: number): Observable<CommunityMember[]> {
    return this.api.get<CommunityMember[]>(`/communities/${communityId}/members`);
  }
}

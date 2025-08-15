import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserDto } from 'src/app/core/models/user-dto.model';
import { BaseApiService, ApiSignals } from './base-api.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseApiService<UserDto> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/users`); // base URL for users
  }

  /** Users */
  getUsers(): ApiSignals<UserDto[]> {
    return this.getAll();
  }

  getUserById(id: string): ApiSignals<UserDto> {
    return this.getOne<UserDto>(id);
  }

  createUser(user: UserDto): ApiSignals<UserDto> {
    return this.create<UserDto>(user);
  }

  updateUser(id: string, user: UserDto): ApiSignals<UserDto> {
    return this.update<UserDto>(id, user);
  }

  deleteUser(id: string): ApiSignals<void> {
    return this.delete(id);
  }
}

import axios, { Method } from 'axios';
import FormData from 'form-data';
import { ApiResponse } from './types';

interface RequestOptions {
  method: Method;
  url: string;
  body?: Record<string, any>;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}
   
export class ApiClient {
  private baseUrl: string = 'https://api.usenebula.io/v1/client';
  private token: string;

  constructor(token: string) {
    this.baseUrl = 'https://api.usenebula.io/v1/client';
    this.token = token;
  }

  private async apiRequest<T>(options: RequestOptions): Promise<ApiResponse<T>> {
    const { method, url, body, params, headers } = options;

    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}${url}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
          ...headers
        },
        data: body,
        params,
      });

      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'API request failed'
      } 
    }
  }

  // For POST requests
  public async post<T>(url: string, body?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.apiRequest<T>({ method: 'POST', url, body });
  }

  // For GET requests
  public async get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.apiRequest<T>({ method: 'GET', url, params });
  }

  // For DELETE requests
  public async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.apiRequest<T>({ method: 'DELETE', url });
  }

  // for uploads
  public async uploadFile<T>(url: string, formData: FormData): Promise<ApiResponse<T>> {
    return this.apiRequest<T>({
      method: 'POST',
      url,
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

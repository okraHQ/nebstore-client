import axios, { Method } from 'axios'
import FormData from 'form-data'
import { ApiResponse } from './storage/types'

interface RequestOptions {
  method: Method
  url: string
  body?: Record<string, any>
  params?: Record<string, any>
  headers?: Record<string, string>
}

const baseUrl = 'https://api.usenebula.io/v1/client'
export class ApiClient {
  private token: string

  constructor(token: string) {
    this.token = token
  }

  private async apiRequest<T>(options: RequestOptions): Promise<ApiResponse<T>> {
    const { method, url, body, params, headers } = options

    try {
      const response = await axios({
        method,
        url: `${baseUrl}${url}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
          ...headers,
        },
        data: body,
        params,
      })

      return response.data
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'API request failed',
      }
    }
  }

  // For POST requests
  public async post<T>(url: string, body?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.apiRequest<T>({ method: 'POST', url, body })
  }

  // For GET requests
  public async get<T>(
    url: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.apiRequest<T>({ method: 'GET', url, params })
  }

  // For DELETE requests
  public async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.apiRequest<T>({ method: 'DELETE', url })
  }

  // for Uploads
  public async uploadFile<T>(url: string, formData: FormData): Promise<ApiResponse<T>> {
    return this.apiRequest<T>({
      method: 'POST',
      url,
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }
}

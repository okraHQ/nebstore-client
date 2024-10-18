import FormData from 'form-data';
import { ApiClient } from '../ApiClient';
import { ApiResponse, Bucket, CreateBucket, IObject, ListParams, Pagination } from './types';


export class BucketService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client =  client;



    
  }

  public async listBuckets(params: ListParams) {
    return this.client.post<ApiResponse<{docs: Bucket[], pagination: Pagination}>>('/buckets/list', params);
  }

  public async listObjects(bucketName: string, params: ListParams) {
    return this.client.post<ApiResponse<{docs: IObject[], pagination: Pagination}>>(`/buckets/${bucketName}/list`, params);
  }

  public async createBucket(params: CreateBucket) {
    return this.client.post<ApiResponse<Bucket>>('/buckets', params);
  }

  public async emptyBucket(bucketName: string) {
    return this.client.post<ApiResponse<null>>(`/buckets/${bucketName}/empty`);
  }

  public async getBucket(bucketName: string) {
    return this.client.get<ApiResponse<Bucket>>(`/buckets/${bucketName}`);
  }
  
  public async uploadObject(bucketName: string, objectKey: string, file: any) {
    const formData = new FormData();
    formData.append('object', file); 
    formData.append('objectKey', objectKey);
    return this.client.uploadFile<ApiResponse<Bucket>>(`/buckets/${bucketName}/objects`, formData);
  }
  
  public async deleteBucket(bucketName: string) {
    return this.client.delete<ApiResponse<null>>(`/buckets/${bucketName}`);
  }

  public async deleteObject(bucketName: string, objectKey: string) {
    return this.client.delete<ApiResponse<null>>(`/buckets/${bucketName}/objects/${objectKey}`);
  }
  
  public async getObject(bucketName: string, objectKey: string) {
    return this.client.get<ApiResponse<IObject>>(`/buckets/${bucketName}/objects/${objectKey}`);
  }
}

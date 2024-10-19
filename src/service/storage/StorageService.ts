import FormData from 'form-data'
import { ApiClient } from '../ApiClient'
import { Bucket, CreateBucket, IObject, ListParams, Pagination } from './types'

export default class StorageService {
  private client: ApiClient

  constructor(apiToken: string) {
    this.client = new ApiClient(apiToken)
  }

  public async listBuckets(params?: ListParams) {
    return this.client.post<{ docs: Bucket[]; pagination: Pagination }>(
      '/buckets/list',
      params
    )
  }

  public async listObjects(bucketName: string, params?: ListParams) {
    return this.client.post<{ docs: IObject[]; pagination: Pagination }>(
      `/buckets/${bucketName}/list`,
      params
    )
  }

  public async createBucket(params: CreateBucket) {
    return this.client.post<Bucket>('/buckets', params)
  }

  public async emptyBucket(bucketName: string) {
    return this.client.post<null>(`/buckets/${bucketName}/empty`)
  }

  public async getBucket(bucketName: string) {
    return this.client.get<Bucket>(`/buckets/${bucketName}`)
  }

  public async uploadObject(
    bucketName: string,
    objectKey: string,
    file: Buffer | Blob | ReadableStream
  ) {
    const formData = new FormData()
    formData.append('object', file)
    formData.append('objectKey', objectKey)
    return this.client.uploadFile<Bucket>(`/buckets/${bucketName}/objects`, formData)
  }

  public async deleteBucket(bucketName: string) {
    return this.client.delete<null>(`/buckets/${bucketName}`)
  }

  public async deleteObject(bucketName: string, objectKey: string) {
    return this.client.delete<null>(`/buckets/${bucketName}/objects/${objectKey}`)
  }

  public async getObject(bucketName: string, objectKey: string) {
    return this.client.get<IObject>(`/buckets/${bucketName}/objects/${objectKey}`)
  }
}

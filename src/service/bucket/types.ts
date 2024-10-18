
export interface ListParams {
    page: number;
    limit: number;
    startDate: Date;
    endDate: Date;
}
  
export interface Bucket {
    createdBy: {
      userId: string;
      fullName: string;
    };
    bucketName: string;
    location: string;
    createdAt: string;
    bucketId: string;
    region: string;
}
  
export interface IObject {
    createdBy: {
      userId: string;
      fullName: string;
    };
    objectKey: string;
    location: string;
    createdAt: string;
    fileFormat: string;
    objectId: string;
    bucket: string
    fileSize: string
}

export interface CreateBucket {
    bucketName: string;
    region: string;
    isPrivate?: boolean;
}

export interface Pagination {
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    pagingCounter: number;
    prevPage: number | null;
    nextPage: number | null;
  }
  
export interface ApiResponse<T> {
   success: boolean
   message: string
   data?: T
}

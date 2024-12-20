# **NebStore Client**

`Nebstore Client` is a JavaScript-based client that provides an easy-to-use interface for managing cloud storage services with `NebStore`. It enables you to create, list, and manage buckets and objects with simple method calls.

## **Features**

- Create, list, and delete buckets.
- Upload, list, and delete objects.
- Pagination support for list operations.
- File uploads using `FormData`.

## **Installation**

You can install the package using **npm** or **yarn**.

### **Using npm**

```bash
npm install nebstore-client
```

using yarn

```bash
yarn add nebstore-client
```

```js
import { NebStore } from 'nebstore-client'
const nebStore = new NebStore('your-api-token')
```

#### List Buckets

```js
// List all buckets with pagination
const params = {
  page: 1,
  limit: 10,
  startDate: new Date('2024-01-01'),
  endDate: new Date(),
}

const response = await nebStore.listBuckets(params)
console.log(response)
```

**Parameters**

- page: Page number.
- limit: Number of buckets per page.
- startDate: The start date to filter the list.
- endDate: The end date to filter the list.

#### List Objects in a bucket

```js
// Lists all objects in a specific bucket with pagination.
const params = {
  page: 1,
  limit: 10,
  startDate: new Date('2024-01-01'),
  endDate: new Date(),
}

const response = await nebStore.listObjects('bucketName', params)
console.log(response)
```

**Parameters**

- bucketName: The name of the bucket.
- params: An object containing pagination and filtering options (similar to listBuckets).

#### Create bucket

```js
// Creates a new bucket with specified details.
const newBucket = {
  bucketName: 'my-new-bucket',
  region: 'sa-1',
  isPrivate: true,
}
const response = await nebStore.createBucket(newBucket)
console.log(response)
```

**Parameters**

- params: An object containing:
  - bucketName: The name of the new bucket.
  - region: The region of the bucket (e.g., 'sa-1').
  - isPrivate: Optional boolean to set the bucket as private.

#### Empty bucket

```js
// Empties all objects from a specified bucket.
const response = await nebStore.emptyBucket('bucketName')
console.log(response)
```

**Parameters**

- bucketName: The name of the bucket to empty.

#### Get bucket

```js
// Fetches the details of a specified bucket.
const response = await nebStore.getBucket('bucketName')
console.log(response)
```

**Parameters**

- bucketName: The name of the bucket.

#### Get Object

```js
// Fetches the details of a specific object in a bucket.
const response = await nebStore.getObject('bucketName', 'objectKey').console.log(response)
```

**Parameters**

- bucketName: The name of the bucket.
- objectKey: The key or name of the object.

#### Upload Object

```js
// Uploads an object (file) to a specific bucket.
const fs = require('fs')
const file = fs.createReadStream('path/to/file.txt')

const response = await nebStore.uploadObject('my-new-bucket', 'my-object-key', file)
console.log(response)
```

**Parameters**

- bucketName: The name of the bucket.
- objectKey: The key or name to assign to the object.
- file: The file to be uploaded (as Buffer, Blob, or ReadableStream).

#### Delete bucket

```js
// Deletes a specified bucket.
const response = await nebStore.deleteBucket('bucketName')
console.log(response)
```

**Parameters**

- bucketName: The name of the bucket.

#### Delete Object

```js
// Deletes a specific object from a bucket.
const response = await nebStore.deleteObject('bucketName', 'objectKey')
console.log(response)
```

**Parameters**

- bucketName: The name of the bucket.
- objectKey: The key or name of the object to delete.

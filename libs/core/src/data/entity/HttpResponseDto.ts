

export class HttpResponseDto<T> {
    statusCode: string;
    response: T;

    isSuccess(): boolean {
      return true;
    }
}


export enum HttpServerResponseCode{
    
}
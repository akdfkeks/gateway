import { Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable, of, throwError } from 'rxjs';

@Catch(RpcException)
export class RpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: RpcException): Observable<any> {
    return throwError(() => exception);
  }
}

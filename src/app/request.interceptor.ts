import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('requestInterceptor', req);
  // need to clone the request
  const newRequest = req.clone({
    headers: req.headers.append('requestInterceptorHeader', 'abcde'),
  });
  if (req.method == 'POST') {
    // req.headers = req.headers.append('requestInterceptorHeader', 'abcde');
  }
  return next(newRequest);
};

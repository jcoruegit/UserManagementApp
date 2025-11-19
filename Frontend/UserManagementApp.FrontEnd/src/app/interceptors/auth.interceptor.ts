import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  console.log('%c[AuthInterceptor]', 'color: blue', 'Interceptando:', req.url);
  console.log('%c[AuthInterceptor]', 'color: blue', 'Token actual:', token);

  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    console.log('%c[AuthInterceptor]', 'color: green', 'Request clonada con headers:', cloned.headers);

    return next(cloned);
  }

  console.warn('%c[AuthInterceptor]', 'color: orange', 'No hay token, request sin header Authorization');
  return next(req);
};





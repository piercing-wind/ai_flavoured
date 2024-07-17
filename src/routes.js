/*
An Array of routes which are accessible to the public and
 do not require authentication.
@type {string[]}
*/
export const publicRoutes = [
   '/',
   '/new-verification',
   '/share',
   '/chat',
   '/aipresentation',
   '/image',
   '/audio',
   '/flavours',
   '/pricing',
   '/about',
   '/privacy-policy',
   '/contact-us',
   '/terms',
   '/robots.txt',
   '/opengraph-image.jpg',
   '/favicon.ico',
   '/manifest.webmanifest',
   '/sitemap',
   'robots.txt',
   'opengraph-image.jpg',
   'favicon.ico',
   'manifest.webmanifest',
];

/*
An Array of routes which are used for authentication.
these routes will redirect users to home page after login or register.
@type {string[]}
*/

export const authRoutes = [ 
   '/login',
   '/register', 
   '/error',
   '/reset-password',
   '/new-password',
];

/*
The Prefix for  API authentication routes.
Routes with this prefix are used for API authentication.
@type {string}
*/
export const apiRoutesPrefix = "/api/"

/*
The default redirect path after login.
*/ 
export const DEFAULT_LOGIN_REDIRECT = "/";
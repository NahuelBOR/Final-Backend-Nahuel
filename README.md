## Profesor, tratando de agregar cosas a ultimo momento rompi todo, estoy iniciando un unevo proyectod esde cero por si es que este no esta aprobado, por favor si es posible para repararlo, espero que pueda entender y espero que sea suficiente

## Nahuel Final BackEnd

```
#.env

HOST=localhost
PORT=8080
DB_URL=mongodb+srv://elnau94:necochea53@cluster0.cn8xroo.mongodb.net/ecomerce
SESSION_SECRET=secretCoder

GITHUB_CLIENT_ID=Iv23lir9P4OkmRBUdhNp
GITHUB_CLIENT_SECRET=c13659a0672edadbf07cb68c33fef094eb3aff66

USER_NODEMAILER=elnau94@gmail.com
PASS_NODEMAILER=jzaxngygbxdmqkrq

USER_ADMIN=nahuel01@gmail.com
PASS_ADMIN=123456

STRIPE_PUBLIC_KEY=pk_test_51PYJYqC30vn0C5aXV8it9y3erPKVZA0yQhk6Rd4BvZUWqZg23bGM442okWTVehhATTHMQZ4PzlRvLQwGRzOA4ThL00ICokb03L
STRIPE_SECRET_KEY=sk_test_51PYJYqC30vn0C5aXv0qGYT7sl40p6tsc93caFczRS8k4x4gx4nfuyUU76a8crZXD75Mebqh405OtbJcFbEIokbdM00OlL8WyFz
```

## Rutas de Productos 

```
- GET /api/products
- POST /api/products
- GET /api/products/:id
- DELETE /api/products/:id
- PUT /api/products/:id
```

## Rutas de Carritos

```
- GET /
- POST /
- GET /:cid
- PUT /:cid
- DELETE /:cid
- POST /:cid/products/:pid
- PUT /:cid/products/:pid
- DELETE /:cid/products/:pid
- DELETE /:cid/clear
- POST /:cid/purchase
```

## Rutas de Sesiones

```
- GET /github
- GET /callbackGithub
- POST /register
- POST /login
- POST /logout
- GET /current
- GET /profile
- POST /forgot-password
- POST /reset-password
```

## Rutas de Pagos

```
- POST /process-payment/:cid
```

## Rutas de Usuarios

```
- GET /api/users
- DELETE /api/users
- GET /api/users/premium/:uid
- PUT /api/users/premium/:uid
- POST /api/users/:uid/documents
```


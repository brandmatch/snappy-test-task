### `npm start`

Will run application on localhost:3000

### `Description`

Single page application with the only route for products (router is used, but route is defined as root `/`).
Products are grabbed from BE part. Everything can be configured from constants (`utils/constants.js`).
Ability to search products by vendor and name simultaneously is supported.
Promotion card is supported and displayed only in case of products > 0.
Products arranged by `order` param. Media is included (`video` is exist, `image` by default).
Application consists of 3 components, `ProductsList` for the list of products, `Product` for single product card and `Promotion` for promotion card.
Functional approach is used. MaterialUI is used as layout builder.
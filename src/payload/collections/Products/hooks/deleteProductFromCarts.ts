// import type { AfterDeleteHook } from 'payload/dist/collections/config/types'

// import type { CartItems, Product, User } from '../../../payload-types'

// export const deleteProductFromCarts: AfterDeleteHook<Product> = async ({ req, id }) => {
//   const usersWithProductInCart = await req.payload.find({
//     collection: 'users',
//     overrideAccess: true,
//     where: {
//       'cart.items.product': {
//         equals: id,
//       },
//     },
//   })

//   if (usersWithProductInCart.totalDocs > 0) {
//     await Promise.all(
//       usersWithProductInCart.docs.map(async (user: User) => {
//         const cart = user.cart
//         const itemsWithoutProduct: CartItems = cart?.items?.length
//           ? cart?.items?.filter(item => item.product !== id)
//           : null

//         return req.payload.update({
//           collection: 'users',
//           id: user.id,
//           data: {
//             cart: {
//               items: itemsWithoutProduct,
//             },
//           },
//         })
//       }),
//     )
//   }
// }
export {} // added empty export to prevent build errors

import type { CartItems, Product, User } from '../../../payload/payload-types'

export type CartItem = {
  product?: string | Product | null | undefined
  quantity?: number | null | undefined
  id?: string | null | undefined
} | null

type CartType = User['cart']

type CartAction =
  | {
      type: 'SET_CART'
      payload: CartType
    }
  | {
      type: 'MERGE_CART'
      payload: CartType
    }
  | {
      type: 'ADD_ITEM'
      payload: CartItem
    }
  | {
      type: 'DELETE_ITEM'
      payload: Product
    }
  | {
      type: 'CLEAR_CART'
    }

export const cartReducer = (cart: CartType, action: CartAction): CartType => {
  switch (action.type) {
    case 'SET_CART': {
      return action.payload
    }

    case 'MERGE_CART': {
      const { payload: incomingCart } = action

      // Combine the two arrays, filtering out null or undefined values
      const combinedArray: CartItems = [
        ...(cart?.items || []),
        ...(incomingCart?.items || []),
      ].filter(item => item != null)

      const merged: CartItems = Object.values(
        combinedArray.reduce((acc, item) => {
          // Determine a key for each item (use Product.id if product is a Product object, else use product string directly)
          const key = typeof item.product === 'object' ? item.product?.id : item.product

          if (key) {
            if (!acc[key]) {
              // If this is the first time we've seen this key, initialize it in the accumulator
              acc[key] = { ...item, quantity: item.quantity || 1 }
            } else {
              // If we've seen this key, merge the quantities
              const existingQuantity = acc[key]?.quantity || 1
              const additionalQuantity = item.quantity || 1
              acc[key] = {
                ...acc[key],
                quantity: existingQuantity + additionalQuantity,
              }
            }
          }
          return acc
        }, []),
      )

      return {
        ...cart,
        items: merged,
      }
    }

    case 'ADD_ITEM': {
      // if the item is already in the cart, increase the quantity
      const { payload: incomingItem } = action
      const productId =
        typeof incomingItem?.product === 'string' ? incomingItem.product : incomingItem?.product?.id

      const indexInCart = cart?.items?.findIndex(({ product }) =>
        typeof product === 'string' ? product === productId : product?.id === productId,
      ) // eslint-disable-line function-paren-newline

      let withAddedItem = [...(cart?.items || [])]

      if (indexInCart === -1 && incomingItem) {
        withAddedItem.push(incomingItem)
      }

      if (typeof indexInCart === 'number' && indexInCart > -1) {
        withAddedItem[indexInCart] = {
          ...withAddedItem[indexInCart],
          quantity: (incomingItem?.quantity || 0) > 0 ? incomingItem?.quantity : undefined,
        }
      }

      return {
        ...cart,
        items: withAddedItem,
      }
    }

    case 'DELETE_ITEM': {
      const { payload: incomingProduct } = action
      const withDeletedItem = { ...cart }

      const indexInCart = cart?.items?.findIndex(({ product }) =>
        typeof product === 'string'
          ? product === incomingProduct.id
          : product?.id === incomingProduct.id,
      ) // eslint-disable-line function-paren-newline

      if (typeof indexInCart === 'number' && withDeletedItem.items && indexInCart > -1)
        withDeletedItem.items.splice(indexInCart, 1)

      return withDeletedItem
    }

    case 'CLEAR_CART': {
      return {
        ...cart,
        items: [],
      }
    }

    default: {
      return cart
    }
  }
}

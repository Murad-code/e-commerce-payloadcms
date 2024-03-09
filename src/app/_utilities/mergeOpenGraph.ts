import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: "Ecommerce - Murad's Projects",
  title: "Ecommerce - Murad's Projects",
  description: 'An ecommerce store + CMS built using Payload and Next.js.',
  images: [],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}

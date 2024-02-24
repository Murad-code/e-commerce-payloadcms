/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = require('./csp')
const redirects = require('./redirects')
const path = require('path')
const { withPayload } = require('@payloadcms/next-payload')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_SERVER_URL}`.replace('https://', ''),
      },
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_S3_ENDPOINT}`.replace('https://', ''),
      },
    ],
  },
  // redirects,
  async headers() {
    const headers = []

    // Prevent search engines from indexing the site if it is not live
    // This is useful for staging environments before they are ready to go live
    // To allow robots to crawl the site, use the `NEXT_PUBLIC_IS_LIVE` env variable
    // You may want to also use this variable to conditionally render any tracking scripts
    // if (!process.env.NEXT_PUBLIC_IS_LIVE) {
    //   headers.push({
    //     headers: [
    //       {
    //         key: 'X-Robots-Tag',
    //         value: 'noindex',
    //       },
    //     ],
    //     source: '/:path*',
    //   })
    // }

    // Set the `Content-Security-Policy` header as a security measure to prevent XSS attacks
    // It works by explicitly whitelisting trusted sources of content for your website
    // This will block all inline scripts and styles except for those that are allowed
    headers.push({
      source: '/(.*)',
      headers: [
        { key: 'Access-Control-Allow-Credentials', value: 'true' },
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
        {
          key: 'Access-Control-Allow-Headers',
          value:
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        },
        {
          key: 'Content-Security-Policy',
          value: ContentSecurityPolicy,
        },
      ],
    })

    return headers
  },
}

module.exports = withPayload(
  // your Next config here
  nextConfig,

  {
    // The second argument to `withPayload`
    // allows you to specify paths to your Payload dependencies
    // and configure the admin route to your Payload CMS.

    // Point to your Payload config (required)
    configPath: path.resolve(__dirname, './src/payload/payload.config.ts'),

    // Point to custom Payload CSS (optional)
    // cssPath: path.resolve(__dirname, './css/my-custom-payload-styles.css'),

    // Point to your exported, initialized Payload instance (optional, default shown below`)
    payloadPath: path.resolve(process.cwd(), './src/payload/payloadClient.ts'),

    // Set a custom Payload admin route (optional, default is `/admin`)
    // NOTE: Read the "Set a custom admin route" section in the payload/next-payload README.
    adminRoute: '/admin',
  },
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.gettyimages.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t4.ftcdn.net",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Disable source maps in development
      config.devtool = false;
    }

    // Limit the number of concurrent workers
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        maxInitialRequests: 1,
        maxAsyncRequests: 1,
      },
    };

    return config;
  },
  // Other configurations
};

export default nextConfig;


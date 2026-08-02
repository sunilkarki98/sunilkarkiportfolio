/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile Three.js ecosystem packages
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    'three-stdlib',
  ],
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github-readme-stats-orcin-eight-46.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github-readme-streak-stats.herokuapp.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

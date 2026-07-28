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
};

export default nextConfig;

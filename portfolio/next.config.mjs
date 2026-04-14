/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: ['sharp'],
  async headers() {
    return [
      {
        source: '/resume.pdf',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf'
          }
        ]
      }
    ];
  }
}

export default nextConfig;

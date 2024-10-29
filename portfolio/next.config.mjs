/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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

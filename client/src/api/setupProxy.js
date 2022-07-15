import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:3001', // 통신할 백엔드 서버 주소를 /api로 호출
      changeOrigin: true,
    }),
  );
}

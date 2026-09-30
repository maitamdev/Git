import { createServer } from './server.js';

const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = process.env.HOST || '0.0.0.0';

const server = createServer();

server.listen(PORT, HOST, () => {
  console.log(`[Git Academy API] Máy chủ LMS đang lắng nghe tại http://${HOST}:${PORT}`);
  console.log(`[Git Academy API] Sẵn sàng phục vụ sinh viên và giảng viên`);
});

export { createServer };

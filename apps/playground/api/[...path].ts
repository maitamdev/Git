import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleApiRequest } from '../../api/src/server.js';

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  return handleApiRequest(req, res);
}

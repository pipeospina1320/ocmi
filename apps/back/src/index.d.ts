declare namespace Express {
  interface Request {
    tenantId?: string;
    token?: string;
  }
}

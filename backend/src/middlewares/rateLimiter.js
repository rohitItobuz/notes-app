import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 15,
    message: 'Too many requests, please try again after 5 minutes',
  });
  
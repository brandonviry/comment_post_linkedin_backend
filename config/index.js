require('dotenv').config();

const config = {
  port: process.env.PORT || 3001,
  corsOptions: {
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : '*',
  },
  openRouter: {
    baseURL: 'https://openrouter.ai/api/v1',
    siteUrl: process.env.YOUR_SITE_URL || 'http://localhost:3000',
    siteName: process.env.YOUR_SITE_NAME || 'LinkedIn Comment Generator',
  },
};

module.exports = config;

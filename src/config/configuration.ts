export default () => ({
 
  database: {
    url: process.env.DB_URL,
  },

  mailer: {
    email: process.env.EMAIL_USER,
    password : process.env.PASSWORD_USER
  },

  cache: {
    url: process.env.REDIS_URL,
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    appName: process.env.APP_NAME
  }
});
export default () => ({
 
  database: {
    url: process.env.DB_URL,
  },

  mailer: {
    email: process.env.EMAIL_USER,
    password : process.env.PASSWORD_USER,
    port: process.env.MAILER_PORT,
    host: process.env.MAILER_HOST
  },

  cache: {
    url: process.env.REDIS_URL,
   
  },

  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET
  }
});
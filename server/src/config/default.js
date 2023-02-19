const config = {
    port: process.env.PORT || 5000,
    db: {
      host: 'localhost',
      user: 'root',
      password: 'onepiece',
      database: 'test'
    },
    jwtSecret: 'mySecretKey'
  };

  module.exports=config
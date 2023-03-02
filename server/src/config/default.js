const config = {
    port: process.env.PORT || 5000,
    db: {
      host: 'localhost',
      user: 'root',
      password: 'onepiece',
      database: 'test'
    },
    jwtSecret: "mySecretKey",
    jwtExpiration: "1h",
    jwtRefresh: "myRefreshKey",
    jwtRefreshExpiration: "30d",
    bcryptSaltRounds: 10,
  };

  module.exports=config;
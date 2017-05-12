module.exports = {
  mongodb: {
    host: 'mongodb://$OPENSHIFT_MONGODB_DB_HOST',
    port: '$OPENSHIFT_MONGODB_DB_PORT',
    database: 'deezdb',
    username: 'OPENSHIFT_MONGODB_DB_USERNAME',
    password: 'OPENSHIFT_MONGODB_DB_PASSWORD',
    name: 'mongodb',
    connector: 'mongodb'
  }
};

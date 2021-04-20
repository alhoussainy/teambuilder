class Configuration {
    db_host: string = process.env.DB_HOST;
    db_user: string = process.env.DB_USER;
    db_password: string = process.env.DB_PASSWORD;
    db_database: string = process.env.DB_DATABASE;
    db_dialect: any = process.env.DB_DIALECT;
    port: string = process.env.PORT;
    app_name = 'Teambuildr';
    logging: false;
    request_limit = '1000000kb';
    session_secret: string = process.env.SESSION_SECRET; //jwt secret
    jwt_expire = '720h';
    node_env: string = process.env.NODE_ENV;
    hash_cost = 10;
}

const cfg = new Configuration();

export default cfg;

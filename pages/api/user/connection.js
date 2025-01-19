export const ConnectionObject = {
    host: secret('DB_HOST'),
    port : secret('DB_PORT'),
    user: secret('DB_USER'),
    password: secret('DB_PASSWORD'),
    database: secret('DB_NAME'),
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
}
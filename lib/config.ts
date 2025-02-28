export const config = {
    env: {
        apiEnpoint: process.env.NEXT_PUBLIC_API_ENPOINT,
        prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENPOINT,
        imagekit: {
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENPOINT,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        },
        databaseUrl: process.env.DATABASE_URL,
        upstash:{
            redisUrl: process.env.UPSTASH_REDIS_URL,
            redisToken: process.env.UPSTASH_REDIS_TOKEN,
            qstashUrl: process.env.QSTASH_URL,
            qstashToken: process.env.QSTASH_TOKEN,
        }
    }
}
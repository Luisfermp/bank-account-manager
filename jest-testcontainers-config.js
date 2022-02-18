module.exports = {
    redis: {
        image: 'redis',
        tag: 'alpine3.12',
        ports: [6379],
        env: {
            EXAMPLE: 'env'
        },
        wait: {
            type: 'text',
            text: 'Ready to accept connections'
        }
    }
};

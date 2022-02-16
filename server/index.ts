import '@common/env';
import Server from '@common/server';
import routes from '@api/routes/routes';

const port = parseInt(process.env.PORT ?? '3000', 10);
export default new Server().router(routes).listen(port);

import '@common/env';
import ExpressServer from '@common/server';

const port = parseInt(process.env.PORT ?? '3000', 10);

export default new ExpressServer().initInfra().then((s) => s.router().listen(port));

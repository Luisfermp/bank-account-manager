import errorHandler from '@common/middlewares/error.handler';
import { Request, Response, NextFunction } from 'express';

export default abstract class BaseController {
  abstract runOperation(req: Request, res: Response): Promise<void>;

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
          await this.runOperation(req, res);
      } catch (e) {
          errorHandler(e, req, res, next);
      }
  }
}

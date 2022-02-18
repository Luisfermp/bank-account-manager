import { NextFunction, Request, Response } from 'express';
import AccountNotFound from '@backoffice/accounts/domain/accountNotFound';
import AccountFound from '@backoffice/accounts/domain/accountFound';
import InvalidArgumentError from '@shared/domain/invalidArgumentError';
import CommandNotRegisteredError from '@shared/domain/bus/command/commandNotRegisteredError';
import CustomError from '@shared/domain/customError';

const errorCodeDiccionary = {
    [AccountNotFound.ACCOUNT_NOT_FOUND_CODE]: 404,
    [AccountFound.ACCOUNT_FOUND_CODE]: 400,
    [InvalidArgumentError.INVALID_ARGUMENT_ERROR_CODE]: 400,
    [CommandNotRegisteredError.COMMAND_NOT_REGISTERED_ERROR_CODE]: 500
};

export default function errorHandler(
    err: CustomError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
): void {
    res.status(errorCodeDiccionary[err.code] ?? 500).json({
        code: err.code ?? 500,
        name: err.name,
        message: err.message
    });
}

import CustomError from '@shared/domain/customError';

export default class EndpointNotConfigured extends CustomError {
    static ENDPOINT_NOT_CONFIGURED_ERROR_CODE = 100005;

    constructor() {
        super(
            'The endpoint request isn\'t configured',
            EndpointNotConfigured.ENDPOINT_NOT_CONFIGURED_ERROR_CODE
        );
    }
}

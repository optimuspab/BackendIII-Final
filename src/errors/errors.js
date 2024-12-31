export const ERROR_DICT = {
    INVALID_INPUT: {
        code: 'INVALID_INPUT',
        status: 400,
        message: 'Los datos proporcionados no son válidos.',
    },
    MISSING_PARAMETERS: {
        code: 'MISSING_PARAMETERS',
        status: 400,
        message: 'Faltan parámetros requeridos en la solicitud.',
    },
    DUPLICATE_RESOURCE: {
        code: 'DUPLICATE_RESOURCE',
        status: 409,
        message: 'El recurso ya existe.',
    },
    NOT_FOUND: {
        code: 'NOT_FOUND',
        status: 404,
        message: 'El recurso solicitado no fue encontrado.',
    },
    UNAUTHORIZED: {
        code: 'UNAUTHORIZED',
        status: 401,
        message: 'No tienes autorización para realizar esta acción.',
    },
    FORBIDDEN: {
        code: 'FORBIDDEN',
        status: 403,
        message: 'No tienes permisos suficientes para acceder a este recurso.',
    },
    SERVER_ERROR: {
        code: 'SERVER_ERROR',
        status: 500,
        message: 'Error interno del servidor.',
    },
    EXTERNAL_PROCESS_ERROR: {
        code: 'EXTERNAL_PROCESS_ERROR',
        status: 502,
        message: 'Hubo un error en el procesamiento externo.',
    },
};

export const createError = (errorKey, additionalInfo = '') => {
    const error = ERROR_DICT[errorKey];
    if (!error) {
        return {
            code: 'UNKNOWN_ERROR',
            status: 500,
            message: 'Ha ocurrido un error desconocido.',
        };
    }
    return {
        ...error,
        message: `${error.message} ${additionalInfo}`.trim(),
    };
};

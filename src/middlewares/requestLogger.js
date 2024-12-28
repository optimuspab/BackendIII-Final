const requestLogger = (req, res, next) => {

    req.logger.info({
      message: 'Request received',
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
    });
  
    next();
  };
  
  export default requestLogger;
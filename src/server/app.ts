import express from 'express';
import { Request, Response } from "express";
import log from './log';
import {
  bloodGlucoseReadingBanding,
  calculateNews2,
  calculateMeows
} from 'dhos-scoring-engine';
import staticFiles from './bundleFilesCache';
import httpContext from 'express-http-context';

const app = express();

function logEndPointHit(req: Request, res: Response, startTime: Date) {
  log.info(`${req.url} endpoint hit`, {
    httpRequest: {
      status: res.statusCode,
      requestUrl: req.url,
      requestMethod: req.method,
      remoteIp: req.connection.remoteAddress,
      responseSize: res.hasHeader('content-length')
        ? res.getHeader('content-length')
        : 0,
      userAgent: req.header('user-agent'),
      latency: `${(new Date().valueOf() - startTime.valueOf()) / 1000}s`
    }
  });
}

app.use(httpContext.middleware);

app.use((req, res, next) => {
  httpContext.ns.bindEmitter(req);
  httpContext.ns.bindEmitter(res);
  const requestId = req.headers['x-request-id'];
  httpContext.set('requestId', requestId);
  next();
});

// Default responses to application/json
app.use(express.json());

app.get('/running', (req, res) => res.send('{"running": true}'));

app.use('/healthcheck', require('express-healthcheck')());

app.get('/rule_definition/:filename', (req, res) => {
  const startTime = new Date();
  const filename = req.params.filename;

  if (staticFiles.hasOwnProperty(filename)) {
    res.send(staticFiles[filename]);
  } else {
    res
      .status(404)
      .contentType('text/plain')
      .end(`Rule type '${filename}' not found.`);
  }
  logEndPointHit(req, res, startTime);
});

app.post('/bg_reading', async (req: Request, res: Response) => {
  const startTime = new Date();
  try {
    const response = await bloodGlucoseReadingBanding(req.body);
    log.info('Completed BG reading engine run');
    log.debug('BG reading Result', { response: response });
    res.json(response);
  } catch (ex) {
    log.error('Failed to score BG reading: ' + ex);
    res.status(400).end(ex.logMessage);
  }
  logEndPointHit(req, res, startTime);
});

app.post('/news2', async (req: Request, res: Response) => {
  const startTime = new Date();
  try {
    const response = await calculateNews2(req.body);
    log.info('Completed NEWS2 engine run');
    log.debug('NEWS2 Result', { response: response });
    res.json(response);
  } catch (ex) {
    log.error('Failed to score NEWS2 obs set: ' + ex);
    res.status(400).end(ex.logMessage);
  }
  logEndPointHit(req, res, startTime);
});

app.post('/meows', async (req: Request, res: Response) => {
  const startTime = new Date();
  try {
    const response = await calculateMeows(req.body);
    log.info('Completed MEOWS engine run');
    log.debug('MEOWS Result', { response: response });
    res.json(response);
  } catch (ex) {
    log.error('Failed to score MEOWS obs set: ' + ex);
    res.status(400).end(ex.logMessage);
  }
  logEndPointHit(req, res, startTime);
});

export default app;

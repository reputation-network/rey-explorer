import addressRouter from './routes/address-router';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import express from 'express';
import indexRouter from './routes/index-router';
import logger from 'morgan';
import path from 'path';
import sassMiddleware from 'node-sass-middleware';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'views'),
  dest: path.join(__dirname, '..', 'public'),
}));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/address', addressRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;

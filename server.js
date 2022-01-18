const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const dayjs = require('dayjs');
const sql = require('./db');

const app = new Koa();
const router = new Router();
app.use(bodyParser());

router.post('/', async (ctx) => {
  const price = parseInt(ctx.request.body.price);
  const type = ctx.request.body.type;
  const remark = ctx.request.body.remark ?? null;
  const timeNow = dayjs().toDate();

  if (isNaN(price) || price < 0) {
    return ctx.throw(400, '價格需為正整數');
  }

  await sql`INSERT INTO moneybook (price, type, time, remark) VALUES (${price}, ${type}, ${timeNow.toISOString()}, ${remark})`;

  ctx.body = {
    price,
    type,
    remark,
    time: timeNow.toISOString(),
  };
});

app.use(router.routes()).use(router.allowedMethods());

const startUp = () => {
  // Check if the database is connected.
  sql`SELECT 1`
    .then(() => {
      app.listen(3000, () => {
        console.log('server is running at 3000');
      });
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

startUp();

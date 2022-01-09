const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const dayjs = require('dayjs');
const sql = require('./db');

const app = new Koa();
app.use(bodyParser());

app.post('/', async (ctx) => {
  const price = parseInt(ctx.request.body.price);
  const type = ctx.request.body.type;
  const timeNow = dayjs().toDate();

  if(isNaN(price) || price < 0) {
    return ctx.throw(400, '價格需為正整數');
  }

  await sql`INSERT INTO moneybook (price, type, time) VALUES (${price}, ${type}, ${timeNow})`;

  ctx.body = {
    price,
    type,
    time: timeNow.toISOString(),
  }
});

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
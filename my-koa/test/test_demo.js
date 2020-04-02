const app = require('../app');
app.use((ctx, next) => {
    console.log(ctx.request);
    console.log(ctx.response)
})
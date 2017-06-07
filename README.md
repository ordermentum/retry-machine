# Retry Machine

Retry Promises

```javascript
const { retry } = require('retry-machine');

async function run(count) {
  console.log(count);
}

async function failure(e, attempt) {
  console.error(e);
}

const runner = retry({ max: 5, delay: 1000, factor: 2 }, failure);
await runner(run, 1);
```

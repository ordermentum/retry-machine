# Retry Machine

[![Greenkeeper badge](https://badges.greenkeeper.io/ordermentum/retry-machine.svg)](https://greenkeeper.io/)

Retry Promises

```javascript
const { retry } = require('retry-machine');

async function run(count) {
  console.log(count);
}

const runner = retry({ max: 5, delay: 1000, factor: 2 });
await runner(run, 1);
```
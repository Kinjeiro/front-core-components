import initAll from '@reagentum/front-core/lib/client/init';

async function start() {
  await initAll();
  const TestClientRunner = require('./TestClientRunner').default;
  await (new TestClientRunner()).run();
}

try {
  start();
} catch (error) {
  console.error(error);
}

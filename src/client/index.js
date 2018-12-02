import initAll from '@igs/front-core/lib/client/init';

async function start() {
  await initAll();
  const ClientRunner = require('./ClientRunner').default;
  await (new ClientRunner()).run();
}

try {
  start();
} catch (error) {
  console.error(error);
}

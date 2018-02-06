import '@reagentum/front-core/lib/client/init';

import ClientRunner from './ClientRunner';

try {
  (new ClientRunner()).run();
} catch (error) {
  console.error(error);
}

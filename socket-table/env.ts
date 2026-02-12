import type { EnvOptions } from 'tnp/src';

const env: Partial<EnvOptions> = {
  website: {
    domain: 'socket-table.example.domain.com',
    title: 'Socket Table',
    useDomain: true,
  },
  loading: {
    preAngularBootstrap: {
      background: '#fdebed',
      loader: { name: 'lds-default' },
    },
  },
};
export default env;

import type { EnvOptions } from 'tnp/src';

const env: Partial<EnvOptions> = {
  website: {
    domain: 'multiple-contexts.example.domain.com',
    title: 'Multiple Contexts',
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

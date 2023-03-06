import { StepSpec } from '@jupiterone/integration-sdk-core';
import { TrendMicroIntegrationConfig } from '../../../../../src/types';

export const apiKeysSpec: StepSpec<TrendMicroIntegrationConfig>[] = [
  {
    id: 'fetch-api-keys',
    name: 'Fetch API Keys',
    entities: [
      {
        resourceName: 'API Key',
        _type: 'trend_micro_api_key',
        _class: ['Key'],
      },
    ],
    relationships: [],
    implemented: true,
  },
];

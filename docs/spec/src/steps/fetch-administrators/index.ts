import { StepSpec } from '@jupiterone/integration-sdk-core';
import { TrendMicroIntegrationConfig } from '../../../../../src/types';

export const administratorsSpec: StepSpec<TrendMicroIntegrationConfig>[] = [
  {
    id: 'fetch-administrators',
    name: 'Fetch administrators',
    entities: [
      {
        resourceName: 'Administrator',
        _type: 'trend_micro_administrator',
        _class: ['User'],
      },
    ],
    relationships: [],
    implemented: true,
  },
];

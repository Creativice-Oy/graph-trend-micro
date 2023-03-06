import { StepSpec } from '@jupiterone/integration-sdk-core';
import { TrendMicroIntegrationConfig } from '../../../../../src/types';

export const computersSpec: StepSpec<TrendMicroIntegrationConfig>[] = [
  {
    id: 'fetch-computers',
    name: 'Fetch computers',
    entities: [
      {
        resourceName: 'Computer',
        _type: 'trend_micro_computer',
        _class: ['Host', 'Device'],
      },
    ],
    relationships: [],
    implemented: true,
  },
];

import { StepSpec } from '@jupiterone/integration-sdk-core';
import { TrendMicroIntegrationConfig } from '../../../../../src/types';

export const computerGroupsSpec: StepSpec<TrendMicroIntegrationConfig>[] = [
  {
    id: 'fetch-computer-groups',
    name: 'Fetch computer groups',
    entities: [
      {
        resourceName: 'Computer Group',
        _type: 'trend_micro_computer_group',
        _class: ['Group'],
      },
    ],
    relationships: [],
    implemented: true,
  },
];

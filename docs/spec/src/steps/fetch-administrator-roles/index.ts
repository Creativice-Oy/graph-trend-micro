import { StepSpec } from '@jupiterone/integration-sdk-core';
import { TrendMicroIntegrationConfig } from '../../../../../src/types';

export const administratorRolesSpec: StepSpec<TrendMicroIntegrationConfig>[] = [
  {
    id: 'fetch-administrator-roles',
    name: 'Fetch administrator roles',
    entities: [
      {
        resourceName: 'Administrator Role',
        _type: 'trend_micro_administrator_role',
        _class: ['AccessRole'],
      },
    ],
    relationships: [],
    implemented: true,
  },
];

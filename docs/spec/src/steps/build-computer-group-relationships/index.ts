import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { TrendMicroIntegrationConfig } from '../../../../../src/types';

export const buildComputerGroupRelationshipSpec: StepSpec<
  TrendMicroIntegrationConfig
>[] = [
  {
    id: 'build-computer-group-relationships',
    name: 'Build computer group relationships',
    entities: [],
    relationships: [
      {
        _type: 'trend_micro_computer_has_group',
        sourceType: 'trend_micro_computer_group',
        _class: RelationshipClass.HAS,
        targetType: 'trend_micro_computer',
      },
    ],
    dependsOn: ['fetch-computers', 'fetch-computer-groups'],
    implemented: true,
  },
];

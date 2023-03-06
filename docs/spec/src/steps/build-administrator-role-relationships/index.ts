import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { TrendMicroIntegrationConfig } from '../../../../../src/types';

export const buildAdministatorRolesRelationshipSpec: StepSpec<
  TrendMicroIntegrationConfig
>[] = [
  {
    id: 'build-administrator-role-relationships',
    name: 'Build administrator role relationships',
    entities: [],
    relationships: [
      {
        _type: 'trend_micro_administrator_assigned_role',
        sourceType: 'trend_micro_administrator',
        _class: RelationshipClass.ASSIGNED,
        targetType: 'trend_micro_administrator_role',
      },
    ],
    dependsOn: ['fetch-administrators', 'fetch-administrator-roles'],
    implemented: true,
  },
];

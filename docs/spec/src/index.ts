import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';
import { TrendMicroIntegrationConfig } from '../../../src/types';
import { buildAdministatorRolesRelationshipSpec } from './steps/build-administrator-role-relationships';
import { buildComputerGroupRelationshipSpec } from './steps/build-computer-group-relationships';
import { administratorRolesSpec } from './steps/fetch-administrator-roles';
import { administratorsSpec } from './steps/fetch-administrators';
import { apiKeysSpec } from './steps/fetch-api-keys';
import { computerGroupsSpec } from './steps/fetch-computer-groups';
import { computersSpec } from './steps/fetch-computers';

export const invocationConfig: IntegrationSpecConfig<TrendMicroIntegrationConfig> = {
  integrationSteps: [
    ...administratorsSpec,
    ...administratorRolesSpec,
    ...buildAdministatorRolesRelationshipSpec,
    ...buildComputerGroupRelationshipSpec,
    ...apiKeysSpec,
    ...computerGroupsSpec,
    ...computersSpec,
  ],
};

import {
  Entity,
  IntegrationStep,
  createIntegrationEntity,
} from '@jupiterone/integration-sdk-core';

import {
  createDeepSecurityClient,
  DeepSecurityAdministratorRole,
} from '../../provider';
import { TrendMicroIntegrationConfig } from '../../types';

export const STEP_ID = 'fetch-administrator-roles';
export const ROLE_TYPE = 'trend_micro_administrator_role';

const step: IntegrationStep<TrendMicroIntegrationConfig> = {
  id: STEP_ID,
  name: 'Fetch administrator roles',
  entities: [
    {
      resourceName: 'Administrator Role',
      _type: ROLE_TYPE,
      _class: ['AccessRole'],
    },
  ],
  relationships: [],
  async executionHandler({ instance, jobState }) {
    const client = createDeepSecurityClient(instance);

    const { roles } = await client.listAdministratorRoles();

    await jobState.addEntities(roles.map(createAdministratorRoleEntity));
  },
};

export default step;

export function createAdministratorRoleEntity(
  role: DeepSecurityAdministratorRole,
): Entity {
  const id = createAdministratorRoleEntityIdentifier(role.ID);
  return createIntegrationEntity({
    entityData: {
      source: role,
      assign: {
        _key: id,
        _type: ROLE_TYPE,
        _class: ['AccessRole'],
        id,
        urn: role.urn,
        // normalize property names to match data model
        name: role.name || role.urn,
      },
    },
  });
}

/**
 * DO NOT change this constant. IDs are not long enough
 * to generate keys that match the min length
 * the data model requires
 */
const ADMIN_ROLE_ID_PREFIX = 'trend-micro-administrator-role';
export function createAdministratorRoleEntityIdentifier(id: number): string {
  return `${ADMIN_ROLE_ID_PREFIX}:${id}`;
}

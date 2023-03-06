import {
  Entity,
  IntegrationStep,
  createIntegrationEntity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import {
  createDeepSecurityClient,
  DeepSecurityAdministrator,
} from '../../provider';
import { TrendMicroIntegrationConfig } from '../../types';

export const STEP_ID = 'fetch-administrators';
export const ADMIN_TYPE = 'trend_micro_administrator';

const step: IntegrationStep<TrendMicroIntegrationConfig> = {
  id: STEP_ID,
  name: 'Fetch administrators',
  entities: [
    {
      resourceName: 'Administrator',
      _type: ADMIN_TYPE,
      _class: ['User'],
    },
  ],
  relationships: [],
  async executionHandler({ instance, jobState }) {
    const client = createDeepSecurityClient(instance);

    const { administrators } = await client.listAdministrators();

    await jobState.addEntities(administrators.map(createAdministratorEntity));
  },
};

export default step;

export function createAdministratorEntity(
  administrator: DeepSecurityAdministrator,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: administrator,
      assign: {
        _key: createAdministratorEntityIdentifier(administrator.ID),
        _type: ADMIN_TYPE,
        _class: ['User'],

        roleId: administrator.roleID,
        // normalize property names to match data model
        name: administrator.fullName || administrator.username,
        createdOn: parseTimePropertyValue(administrator.created, 'ms'),
      },
    },
  });
}

/**
 * DO NOT change this constant. IDs are not long enough
 * to generate keys that match the min length
 * the data model requires
 */
const ADMIN_ID_PREFIX = 'trend-micro-administrator';
function createAdministratorEntityIdentifier(id: string): string {
  return `${ADMIN_ID_PREFIX}:${id}`;
}

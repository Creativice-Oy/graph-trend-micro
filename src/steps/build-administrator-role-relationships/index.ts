import {
  Entity,
  Relationship,
  JobState,
  IntegrationStep,
  IntegrationStepExecutionContext,
  createIntegrationRelationship,
} from '@jupiterone/integration-sdk';

import { STEP_ID as ADMIN_STEP, ADMIN_TYPE } from '../fetch-administrators';
import { STEP_ID as ROLE_STEP, ROLE_TYPE } from '../fetch-administrator-roles';

const step: IntegrationStep = {
  id: 'build-administrator-role-relationships',
  name: 'Build administrator role relationships',
  types: [],
  dependsOn: [ADMIN_STEP, ROLE_STEP],
  async executionHandler({ jobState }: IntegrationStepExecutionContext) {
    const roleIdMap = await createRoleIdMap(jobState);

    await jobState.iterateEntities({ _type: ADMIN_TYPE }, async (admin) => {
      const role = roleIdMap.get(admin.roleID as number);

      if (role) {
        const relationship = createAdministratorToRoleRelationship(admin, role);
        await jobState.addRelationships([relationship]);
      }
    });
  },
};

async function createRoleIdMap(
  jobState: JobState,
): Promise<Map<number, Entity>> {
  const roleIdMap = new Map<number, Entity>();
  await jobState.iterateEntities({ _type: ROLE_TYPE }, (role) => {
    // unfortunately need to cast because of EntityPropertyValue type
    roleIdMap.set(role.ID as number, role);
  });
  return roleIdMap;
}

export default step;

export function createAdministratorToRoleRelationship(
  admin: Entity,
  role: Entity,
): Relationship {
  return createIntegrationRelationship({
    _class: 'ASSIGNED',
    from: admin,
    to: role,
  });
}
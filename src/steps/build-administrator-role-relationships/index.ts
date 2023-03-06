import {
  Entity,
  Relationship,
  JobState,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
  createDirectRelationship,
} from '@jupiterone/integration-sdk-core';

import { STEP_ID as ADMIN_STEP, ADMIN_TYPE } from '../fetch-administrators';
import {
  STEP_ID as ROLE_STEP,
  ROLE_TYPE,
  createAdministratorRoleEntityIdentifier,
} from '../fetch-administrator-roles';

const step: IntegrationStep = {
  id: 'build-administrator-role-relationships',
  name: 'Build administrator role relationships',
  entities: [],
  relationships: [
    {
      _type: 'trend_micro_administrator_assigned_role',
      sourceType: ADMIN_TYPE,
      _class: RelationshipClass.ASSIGNED,
      targetType: ROLE_TYPE,
    },
  ],
  dependsOn: [ADMIN_STEP, ROLE_STEP],
  async executionHandler({ jobState }: IntegrationStepExecutionContext) {
    const roleIdMap = await createRoleIdMap(jobState);

    await jobState.iterateEntities({ _type: ADMIN_TYPE }, async (admin) => {
      const roleKey = createAdministratorRoleEntityIdentifier(
        admin.roleId as number,
      );
      const role = roleIdMap.get(roleKey);

      if (role) {
        const relationship = createAdministratorToRoleRelationship(admin, role);
        await jobState.addRelationships([relationship]);
      }
    });
  },
};

async function createRoleIdMap(
  jobState: JobState,
): Promise<Map<string, Entity>> {
  const roleIdMap = new Map<string, Entity>();
  await jobState.iterateEntities({ _type: ROLE_TYPE }, (role) => {
    // unfortunately need to cast because of EntityPropertyValue type
    roleIdMap.set(role.id as string, role);
  });
  return roleIdMap;
}

export default step;

export function createAdministratorToRoleRelationship(
  admin: Entity,
  role: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.ASSIGNED,
    from: admin,
    to: role,
  });
}

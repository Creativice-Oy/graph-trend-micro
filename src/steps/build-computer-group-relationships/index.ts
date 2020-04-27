import {
  Entity,
  Relationship,
  JobState,
  IntegrationStep,
  IntegrationStepExecutionContext,
  createIntegrationRelationship,
} from '@jupiterone/integration-sdk';

import { STEP_ID as COMPUTER_STEP, COMPUTER_TYPE } from '../fetch-computers';
import {
  STEP_ID as COMPUTER_GROUP_STEP,
  COMPUTER_GROUP_TYPE,
} from '../fetch-computer-groups';

const step: IntegrationStep = {
  id: 'build-computer-group-relationships',
  name: 'Build computer group relationships',
  types: ['trend_micro_computer_has_group'],
  dependsOn: [COMPUTER_STEP, COMPUTER_GROUP_STEP],
  async executionHandler({ jobState }: IntegrationStepExecutionContext) {
    const groupIdMap = await createComputerGroupIdMap(jobState);

    await jobState.iterateEntities(
      { _type: COMPUTER_TYPE },
      async (computer) => {
        const group = groupIdMap.get(computer.groupID as number);

        if (group) {
          const relationship = createComputerGroupRelationship(computer, group);
          await jobState.addRelationships([relationship]);
        }
      },
    );
  },
};

async function createComputerGroupIdMap(
  jobState: JobState,
): Promise<Map<number, Entity>> {
  const groupIdMap = new Map<number, Entity>();
  await jobState.iterateEntities({ _type: COMPUTER_GROUP_TYPE }, (group) => {
    // unfortunately need to cast because of EntityPropertyValue type
    groupIdMap.set(group.ID as number, group);
  });
  return groupIdMap;
}

export default step;

export function createComputerGroupRelationship(
  computer: Entity,
  group: Entity,
): Relationship {
  return createIntegrationRelationship({
    _class: 'HAS',
    from: computer,
    to: group,
  });
}
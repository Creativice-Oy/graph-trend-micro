import {
  Entity,
  IntegrationStep,
  createIntegrationEntity,
} from '@jupiterone/integration-sdk-core';

import {
  createDeepSecurityClient,
  DeepSecurityComputerGroup,
} from '../../provider';
import { TrendMicroIntegrationConfig } from '../../types';

export const STEP_ID = 'fetch-computer-groups';
export const COMPUTER_GROUP_TYPE = 'trend_micro_computer_group';

const step: IntegrationStep<TrendMicroIntegrationConfig> = {
  id: STEP_ID,
  name: 'Fetch computer groups',
  entities: [
    {
      resourceName: 'Computer Group',
      _type: COMPUTER_GROUP_TYPE,
      _class: ['Group'],
    },
  ],
  relationships: [],
  async executionHandler({ instance, jobState }) {
    const client = createDeepSecurityClient(instance);

    const { computerGroups } = await client.listComputerGroups();

    await jobState.addEntities(computerGroups.map(createComputerGroupEntity));
  },
};

export default step;

export function createComputerGroupEntity(
  group: DeepSecurityComputerGroup,
): Entity {
  const id = createComputerGroupEntityIdentifier(group.ID);

  return createIntegrationEntity({
    entityData: {
      source: group,
      assign: {
        _key: id!,
        _type: COMPUTER_GROUP_TYPE,
        // NOTE: Some of the entities collected through this may seem
        // like they really should be part of the Network class
        // since they contain subnet ids
        // but there isn't enough information returned to actually
        // fulfill the requirements to fit that in the data model.
        //
        // Also not all computer groups returned are subnets.
        // An AWS account group may be returned from the API
        // if an AWS Connector was setup.
        //
        // So for now we will consider computerGroups as
        // generic Group entities.
        _class: ['Group'],
        cloudType: group.cloudType,
        type: group.type,

        // stringify to match data model
        id,
        amazonSubnetId: createComputerGroupEntityIdentifier(
          group.amazonSubnetID,
        ),
        parentGroupId: createComputerGroupEntityIdentifier(group.parentGroupID),
      },
    },
  });
}

/**
 * DO NOT change this constant. IDs are not long enough
 * to generate keys that match the min length
 * the data model requires
 */
const COMPUTER_GROUP_ID_PREFIX = 'trend-micro-computer-group';
export function createComputerGroupEntityIdentifier(
  id?: string,
): string | undefined {
  return id ? `${COMPUTER_GROUP_ID_PREFIX}:${id}` : undefined;
}

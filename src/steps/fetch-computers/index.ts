import {
  Entity,
  IntegrationStep,
  createIntegrationEntity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { createDeepSecurityClient, DeepSecurityComputer } from '../../provider';
import { createComputerGroupEntityIdentifier } from '../fetch-computer-groups';
import { TrendMicroIntegrationConfig } from '../../types';

export const STEP_ID = 'fetch-computers';
export const COMPUTER_TYPE = 'trend_micro_computer';

const step: IntegrationStep<TrendMicroIntegrationConfig> = {
  id: STEP_ID,
  name: 'Fetch computers',
  entities: [
    {
      resourceName: 'Computer',
      _type: COMPUTER_TYPE,
      _class: ['Host', 'Device'],
    },
  ],
  relationships: [],
  async executionHandler({ instance, jobState }) {
    const client = createDeepSecurityClient(instance);

    const { computers } = await client.listComputers();

    await jobState.addEntities(computers.map(createComputerEntity));
  },
};

export default step;

export function createComputerEntity(computer: DeepSecurityComputer): Entity {
  const id = createComputerEntityIdentifier(computer.ID);
  return createIntegrationEntity({
    entityData: {
      source: computer,
      assign: {
        _key: id,
        _type: COMPUTER_TYPE,
        _class: ['Host', 'Device'],

        // normalize property names to match data model
        id,
        createdOn: parseTimePropertyValue(computer.created, 'ms'),
        name: computer.displayName || computer.hostName,
        hostname: computer.hostName,
        platform: extractPlatform(computer.platform),
        groupId: createComputerGroupEntityIdentifier(computer.groupID),
        cloudProvider: computer.ec2VirtualMachineSummary?.cloudProvider,
        awsAccountId: computer.ec2VirtualMachineSummary?.accountID,
        ec2InstanceId: computer.ec2VirtualMachineSummary?.instanceID,
        agentStatus: computer.computerStatus?.agentStatus,
        applianceStatus: computer.computerStatus?.applianceStatus,
        agentGUID: computer.agentGUID,
        hostGUID: computer.hostGUID,
        category: 'endpoint',
        make: null,
        model: null,
        serial: null,
        deviceId: computer.hostGUID,
      },
    },
  });
}

/**
 * DO NOT change this constant. IDs are not long enough
 * to generate keys that match the min length
 * the data model requires
 */
const COMPUTER_ID_PREFIX = 'trend-micro-computer';
export function createComputerEntityIdentifier(id: string): string {
  return `${COMPUTER_ID_PREFIX}:${id}`;
}

/**
 * This regular expression is used to extract the platform name
 * that matches our data model from the string returned by the
 * computer api
 */
const PLATFORM_REGEX = /(darwin|linux|unix|windows|android|ios|embedded)/i;
function extractPlatform(platform: string): string {
  const regexResult = platform.match(PLATFORM_REGEX);
  let match: string | undefined = undefined;

  if (regexResult) {
    match = regexResult[0];
  }

  return match ? match.toLowerCase() : 'other';
}

import {
  Entity,
  IntegrationStep,
  createIntegrationEntity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { createDeepSecurityClient, DeepSecurityApiKey } from '../../provider';
import { TrendMicroIntegrationConfig } from '../../types';

const API_KEY_TYPE = 'trend_micro_api_key';

const step: IntegrationStep<TrendMicroIntegrationConfig> = {
  id: 'fetch-api-keys',
  name: 'Fetch API Keys',
  entities: [
    {
      resourceName: 'API Key',
      _type: API_KEY_TYPE,
      _class: ['Key'],
    },
  ],
  relationships: [],
  async executionHandler({ instance, jobState }) {
    const client = createDeepSecurityClient(instance);

    const { apiKeys } = await client.listApiKeys();

    await jobState.addEntities(apiKeys.map(createApiKeyEntity));
  },
};

export default step;

export function createApiKeyEntity(apiKey: DeepSecurityApiKey): Entity {
  const id = createApiKeyEntityIdentifier(apiKey.ID);
  return createIntegrationEntity({
    entityData: {
      source: apiKey,
      assign: {
        _key: id,
        _type: API_KEY_TYPE,
        _class: ['Key'],

        // normalize property names to match data model
        id,
        name: apiKey.keyName,
        createdOn: parseTimePropertyValue(apiKey.created, 'ms'),
      },
    },
  });
}

/**
 * DO NOT change this constant. IDs are not long enough
 * to generate keys that match the min length
 * the data model requires
 */
const API_KEY_ID_PREFIX = 'trend-micro-api-key';
function createApiKeyEntityIdentifier(id: string): string {
  return `${API_KEY_ID_PREFIX}:${id}`;
}

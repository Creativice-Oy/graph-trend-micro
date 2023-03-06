import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk-core';
import { StepTestConfig } from '@jupiterone/integration-sdk-testing';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { invocationConfig } from '../src';
import { TrendMicroIntegrationConfig } from '../src/types';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}
const DEFAULT_API_KEY =
  '12345678-ABCD-E85C-8F75-A71847FE5017:B4859BE6-EE84-D37E-9A7C-FF0C4B748E5A:12234OkwpmA5AMa5fb8humOZLlpl301Pf1234567890=';

export const integrationConfig: TrendMicroIntegrationConfig = {
  apiKey: process.env.API_KEY || DEFAULT_API_KEY,
};

export function buildStepTestConfigForStep(stepId: string): StepTestConfig {
  return {
    stepId,
    instanceConfig: integrationConfig,
    invocationConfig: invocationConfig as IntegrationInvocationConfig,
  };
}

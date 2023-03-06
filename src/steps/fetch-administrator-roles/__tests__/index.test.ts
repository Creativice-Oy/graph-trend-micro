import {
  executeStepWithDependencies,
  Recording,
} from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../../test/config';
import { setupProjectRecording } from '../../../../test/recording';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-administrator-roles', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-administrator-roles',
  });

  const stepConfig = buildStepTestConfigForStep('fetch-administrator-roles');
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

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

test('fetch-computer-groups', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-computer-groups',
  });

  const stepConfig = buildStepTestConfigForStep('fetch-computer-groups');
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

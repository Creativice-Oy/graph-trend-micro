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

test('build-administrator-role-relationships', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'build-administrator-role-relationships',
  });

  const stepConfig = buildStepTestConfigForStep(
    'build-administrator-role-relationships',
  );
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

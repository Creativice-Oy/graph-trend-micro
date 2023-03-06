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

test('build-computer-group-relationships', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'build-computer-group-relationships',
  });

  const stepConfig = buildStepTestConfigForStep(
    'build-computer-group-relationships',
  );
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

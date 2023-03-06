import {
  setupRecording,
  Recording,
  SetupRecordingInput,
  mutations,
} from '@jupiterone/integration-sdk-testing';

export { Recording };

export function setupProjectRecording(
  input: Omit<SetupRecordingInput, 'mutateEntry'>,
): Recording {
  return setupRecording({
    ...input,
    redactedRequestHeaders: ['Authorization', 'api-secret-key'],
    redactedResponseHeaders: ['set-cookie'],
    mutateEntry: mutations.unzipGzippedRecordingEntry,
  });
}

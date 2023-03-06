import { DeepSecurityClient } from '../DeepSecurityClient';

import nodeFetch from 'node-fetch';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.doMock();
});

afterEach(() => {
  jest.useRealTimers();
});

test('appends passed in path to api base url', async () => {
  const fetchSpy = jest.spyOn(nodeFetch, 'default');

  fetchMock.mockResponse(JSON.stringify({}));

  const apiKey = 'my fake api key';
  const client = new DeepSecurityClient({ apiKey });

  await client.fetch('/administrators', {
    method: 'GET',
  });

  expect(fetchSpy).toHaveBeenCalledTimes(1);
  expect(fetchSpy).toHaveBeenCalledWith(
    'https://app.deepsecurity.trendmicro.com/api/administrators',
    expect.any(Object),
  );
});

test('applies api key to requests made with client', async () => {
  const fetchSpy = jest.spyOn(nodeFetch, 'default');

  fetchMock.mockResponse(JSON.stringify({}));

  const apiKey = 'my fake api key';
  const client = new DeepSecurityClient({ apiKey });

  await client.fetch('/administrators');

  expect(fetchSpy).toHaveBeenCalledTimes(1);
  expect(fetchSpy).toHaveBeenCalledWith(expect.any(String), {
    headers: {
      'api-secret-key': apiKey,
      'api-version': 'v1',
    },
  });
});

test('merges required headers with additional headers via options', async () => {
  const fetchSpy = jest.spyOn(nodeFetch, 'default');

  fetchMock.mockResponse(JSON.stringify({}));

  const apiKey = 'my fake api key';
  const client = new DeepSecurityClient({ apiKey });

  await client.fetch('/administrators', {
    headers: {
      newHeader: '1',
    },
  });

  expect(fetchSpy).toHaveBeenCalledTimes(1);
  expect(fetchSpy).toHaveBeenCalledWith(expect.any(String), {
    headers: {
      'api-secret-key': apiKey,
      'api-version': 'v1',
      newHeader: '1',
    },
  });
});

test('returns response body on successful requests', async () => {
  fetchMock.mockResponse(
    JSON.stringify({
      data: true,
    }),
  );

  const apiKey = 'my fake api key';
  const client = new DeepSecurityClient({ apiKey });

  const result = await client.fetch('/administrators', {
    headers: {
      newHeader: '1',
    },
  });

  expect(result).toEqual({
    data: true,
  });
});

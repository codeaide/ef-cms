const { uploadPdfFromClient } = require('./uploadPdfFromClient');
const { User } = require('../../business/entities/User');

describe('uploadPdfFromClient', () => {
  it('makes a post request to the expected endpoint with the expected data', async () => {
    let postStub = jest.fn().mockResolvedValue(null);
    const applicationContext = {
      getCurrentUser: () => {
        return { role: User.ROLES.petitioner, userId: 'petitioner' };
      },
      getCurrentUserToken: () => {
        return '';
      },
      getHttpClient: () => ({
        post: postStub,
      }),
    };
    await uploadPdfFromClient({
      applicationContext,
      documentId: '123',
      file: new File([], 'abc'),
      onUploadProgress: () => null,
      policy: {
        fields: {
          Policy: 'gg',
          'X-Amz-Algorithm': '1',
          'X-Amz-Credential': '2',
          'X-Amz-Date': '3',
          'X-Amz-Security-Token': '4',
          'X-Amz-Signature': '5',
        },
        url: 'http://test.com',
      },
    });
    expect(postStub.mock.calls[0][0]).toEqual('http://test.com');
    expect([...postStub.mock.calls[0][1].entries()]).toMatchObject([
      ['key', '123'],
      ['X-Amz-Algorithm', '1'],
      ['X-Amz-Credential', '2'],
      ['X-Amz-Date', '3'],
      ['X-Amz-Security-Token', '4'],
      ['Policy', 'gg'],
      ['X-Amz-Signature', '5'],
      ['content-type', 'application/pdf'],
      ['file', {}],
    ]);
    expect(postStub.mock.calls[0][2]).toMatchObject({
      headers: { 'content-type': 'multipart/form-data; boundary=undefined' },
    });
  });
  it('makes use of defaults when not provided', async () => {
    let postStub = jest.fn().mockResolvedValue(null);
    const applicationContext = {
      getCurrentUser: () => {
        return { role: User.ROLES.petitioner, userId: 'petitioner' };
      },
      getCurrentUserToken: () => {
        return '';
      },
      getHttpClient: () => ({
        post: postStub,
      }),
    };
    await uploadPdfFromClient({
      applicationContext,
      documentId: '123',
      file: new Blob([]),
      onUploadProgress: () => null,
      policy: {
        fields: {
          Policy: 'gg',
          'X-Amz-Algorithm': '1',
          'X-Amz-Credential': '2',
          'X-Amz-Date': '3',
          'X-Amz-Signature': '5',
        },
        url: 'http://test.com',
      },
    });
    expect([...postStub.mock.calls[0][1].entries()]).toMatchObject([
      ['key', '123'],
      ['X-Amz-Algorithm', '1'],
      ['X-Amz-Credential', '2'],
      ['X-Amz-Date', '3'],
      ['X-Amz-Security-Token', ''],
      ['Policy', 'gg'],
      ['X-Amz-Signature', '5'],
      ['content-type', 'application/pdf'],
      ['file', {}],
    ]);
    expect(postStub.mock.calls[0][2]).toMatchObject({
      headers: { 'content-type': 'multipart/form-data; boundary=undefined' },
    });
  });
});

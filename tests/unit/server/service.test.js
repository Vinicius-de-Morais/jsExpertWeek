import { jest, expect, describe, test, beforeEach } from '@jest/globals';
import { Service } from '../../../server/service.js';
import TestUtil from '../_util/testUtil.js';
import config from '../../../server/config.js';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { join } from 'path';

const {
  dir: { publicDirectory },
} = config;

describe('#Services - service functions', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });
  const service = new Service();

  test('getFileStream() - should return a type and name given a file', async () => {
    const filename = '/index.html';
    const mockReadableStream = TestUtil.generateReadableStream(['data']);
    const type = '.html';

    jest
      .spyOn(Service.prototype, Service.prototype.getFileInfo.name)
      .mockReturnValue({
        type: type,
        name: filename,
      });

    jest
      .spyOn(Service.prototype, Service.prototype.createFileStream.name)
      .mockReturnValue(mockReadableStream);

    const result = await service.getFileStream(filename);

    expect(Service.prototype.createFileStream).toHaveBeenCalledWith(filename);
    expect(result).toStrictEqual({
      stream: mockReadableStream,
      type: type,
    });
  });

  test('getFileInfo() - should return an object containing a name and type', async () => {
    const filename = '/index.html';
    const fullPath = join(publicDirectory, filename);
    const expectedResult = {
      type: '.html',
      name: fullPath,
    };

    const mokedStream = jest.spyOn(fsPromises, fsPromises.access.name).mockReturnValue();
    const result = await service.getFileInfo(filename);

    expect(mokedStream).toHaveBeenCalledWith(fullPath);
    expect(result).toStrictEqual(expectedResult);
  });

  test('createFileStream() - should return a fileStream', async () => {
    const filename = 'index.html';
    const readableStream = TestUtil.generateReadableStream(['data']);

    const mokedStream =jest
      .spyOn(fs, fs.createReadStream.name)
      .mockReturnValue(readableStream);

    const result = await service.createFileStream(filename);

    expect(mokedStream).toHaveBeenCalledWith(filename);
    expect(result).toStrictEqual(readableStream);
  });

  describe('exceptions', () => {
    test('getFileStream() - should return an error if file doesnt exist', async () => {
      const filename = '/index.html';

      const mokedStream = jest
        .spyOn(Service.prototype, Service.prototype.getFileInfo.name)
        .mockRejectedValue(new Error('Error: ENOENT'));

      await expect(service.getFileStream(filename)).rejects.toThrow();

      expect(mokedStream).toHaveBeenCalledWith(filename);
    });

    test('getFileInfo() - should return an error if file doesnt exist', async () => {
      const filename = '/index.html';
      const expectedfullFilePath = join(publicDirectory, filename);

      const mokedStream = jest
        .spyOn(fsPromises, fsPromises.access.name)
        .mockRejectedValue(
          new Error('Error: ENOENT: no such file or directory')
        );

      const result = service.getFileInfo(filename);
      await expect(result).rejects.toThrow();

      expect(mokedStream).toHaveBeenCalledWith(expectedfullFilePath);
    });
  });
});
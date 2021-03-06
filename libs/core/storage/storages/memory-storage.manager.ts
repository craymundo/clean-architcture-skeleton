import { EncryptionManager } from '../../encryptor';
import { IMessages, IStorage, IStorageConfig } from '../global';
import * as messages from '../global/i18n';

export abstract class MemoryStorageManager implements IStorage {
  config: IStorageConfig;
  protected encryptor: EncryptionManager;
  protected memoryStorage = new Map();
  protected messages: IMessages;

  constructor(config: IStorageConfig) {
    this.config = config;
    this.encryptor = new EncryptionManager(String(this.config.secretKey));
    switch (this.config.i18nLang) {
      case 'en_US':
        this.messages = messages.en_US;
        break;
      default:
        this.messages = messages.es;
        break;
    }
  }

  get(key: string) {
    if (this.memoryStorage) {
      const hash = this.memoryStorage.get(key) || null;
      if (hash === null) {
        return hash;
      }

      return JSON.parse(
        this.encryptor.getEncryptor('browser').unEncrypt(String(hash)),
      );
    }

    return '';
  }

  set(key: string, value: any) {
    const hash = this.encryptor
      .getEncryptor('browser')
      .encrypt(JSON.stringify(value));

    return this.memoryStorage.set(key, hash);
  }

  clear() {
    return this.memoryStorage.clear();
  }

  remove(key: string) {
    this.memoryStorage.delete(key);
  }
}

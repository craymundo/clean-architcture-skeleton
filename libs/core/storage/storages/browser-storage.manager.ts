import { EncryptionManager } from '../../encryptor';
import { IMessages, IStorage, IStorageConfig } from '../global';
import * as messages from '../global/i18n';

export abstract class BrowserStorageManager implements IStorage {
  config: IStorageConfig;
  protected encryptor: EncryptionManager;
  protected messages: IMessages;
  protected windowStorage?: Storage;

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
    if (this.windowStorage) {
      const hash = this.windowStorage.getItem(key) || null;
      if (hash === null) {
        return hash;
      }

      return JSON.parse(this.encryptor.getEncryptor('browser').unEncrypt(hash));
    }

    return '';
  }

  set(key: string, value: any) {
    if (this.windowStorage) {
      try {
        const hash = this.encryptor
          .getEncryptor('browser')
          .encrypt(JSON.stringify(value));
        this.windowStorage.setItem(key, hash);
      } catch (e) {
        throw new Error(e);
      }
    }
  }

  clear() {
    if (this.windowStorage) {
      this.windowStorage.clear();
    }
  }

  remove(key: string) {
    if (this.windowStorage) {
      this.windowStorage.removeItem(key);
    }
  }
}

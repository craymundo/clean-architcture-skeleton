const events = new Map<string, (params: any) => void>();

export class MediatorManager {
  static publish(name: string, params?: any): void {
    if (!events.has(name)) return;

    events.get(name)(params);
  }

  static subscribe(
    name: string,
    callback: () => void,
    overwrite = false
  ): void {
    if (overwrite) {
      MediatorManager.unsubscribe(name);
    }

    events.set(name, callback);
  }

  static unsubscribe(name: string): void {
    events.delete(name);
  }
}

const DB_NAME = 'ComponentDesignerDB';
const DB_VERSION = 1;
let dbInstance: IDBDatabase | null = null;

interface DBSchema {
  components: {
    id: string;
    name: string;
    code: string;
    lastModified: number;
  };
}

async function getDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('components')) {
        const store = db.createObjectStore('components', { keyPath: 'id' });
        store.createIndex('name', 'name', { unique: true });
        store.createIndex('lastModified', 'lastModified', { unique: false });
      }
    };
  });
}

export const componentDB = {
  async getAll() {
    const db = await getDB();
    return new Promise<DBSchema['components'][]>((resolve, reject) => {
      const transaction = db.transaction(['components'], 'readonly');
      const store = transaction.objectStore('components');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  },

  async get(id: string) {
    const db = await getDB();
    return new Promise<DBSchema['components']>((resolve, reject) => {
      const transaction = db.transaction(['components'], 'readonly');
      const store = transaction.objectStore('components');
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  },

  async save(component: DBSchema['components']) {
    const db = await getDB();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(['components'], 'readwrite');
      const store = transaction.objectStore('components');
      const request = store.put(component);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  },

  async delete(id: string) {
    const db = await getDB();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(['components'], 'readwrite');
      const store = transaction.objectStore('components');
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
};
const mockFirestore = {
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      get: jest.fn(async () => ({ exists: true, data: () => ({}) })),
      set: jest.fn(async () => true),
      update: jest.fn(async () => true),
      delete: jest.fn(async () => true),
    })),
    get: jest.fn(async () => ({ docs: [] })),
    where: jest.fn(() => ({
      get: jest.fn(async () => ({ docs: [] }))
    }))
  }))
};


export default {
  apps: [],
  initializeApp: jest.fn(),
  firestore: () => mockFirestore,
  storage: () => ({
    bucket: () => ({
      upload: jest.fn(),
      file: jest.fn(() => ({
        getSignedUrl: jest.fn()
      }))
    })
  }),
  credential: {
    cert: jest.fn(),
  },
};

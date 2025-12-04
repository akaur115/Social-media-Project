export const db = {
  collection: jest.fn().mockReturnValue({
    add: jest.fn().mockImplementation(async (data) => {
      return { id: "mock123", ...data };
    }),

    where: jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        get: jest.fn().mockResolvedValue({
          empty: false,
          docs: [
            {
              id: "mockUserId",
              data: () => ({
                email: "test@example.com",
                username: "testUser",
                createdAt: Date.now(),
              }),
            },
          ],
        }),
      }),
    }),

    doc: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({
        exists: true,
        id: "mockUserId",
        data: () => ({
          email: "test@example.com",
          username: "testUser",
          createdAt: Date.now(),
        }),
      }),

      update: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
    }),
  }),
};

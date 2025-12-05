import { userService } from "../src/api/v1/services/user.service";
import * as userRepo from "../src/api/v1/repositories/user.repository";

jest.mock("../src/api/v1/repositories/user.repository");

describe("User Service", () => {
  it("should return user data when fetched by ID", async (): Promise<void> => {
    (userRepo.getUserById as jest.Mock).mockResolvedValue({
      id: "1",
      username: "tester",
    });

    const user = await userService.getById("1");
    expect(user?.username).toBe("tester");
  });

  it("should update a user's photo successfully", async (): Promise<void> => {
    (userRepo.updateUserPhoto as jest.Mock).mockResolvedValue(undefined);

    await expect(
      userService.updatePhoto("123", "http://image.com/photo.png")
    ).resolves.not.toThrow();
  });
});

import Store from "@/store/store";

describe("Test store sets and gets values correctly", () => {
    test("Can set a user on store", () => {
        //Arrange
        const user = {
            id: "id",
            username: "username",
            type: "Driver",
        };

        //Act
        Store.dispatch("updateUser", user);

        //Assert
        expect(Store.getters.user).toBe(user);
    });
});

import { formatDate, formatCost, isUserAuthenticated } from "@/utilities";
import Store from "@/store/store";

describe("Format Date", () => {
    test("Can return date in correct format", () => {
        //Arrange
        const dateString = "2022-02-01T15:50:51.039Z";

        //Act
        const formattedDateString = formatDate(dateString);

        //Assert
        expect(formattedDateString).toBe("Tue 1 Feb 2022 @ 15:50");
    });
});

describe("Format Cost", () => {
    test("Can convert price from NOK to SEK", () => {
        //Arrange
        const currencyString = "SEK";
        Store.dispatch("updateSelectedCurrency", currencyString);

        //Act
        const convertedCost = formatCost(10);

        //Assert
        expect(convertedCost).toBe("SEK 10.40");
    });

    test("Can convert price from NOK to ISK", () => {
        //Arrange
        const currencyString = "ISK";
        Store.dispatch("updateSelectedCurrency", currencyString);

        //Act
        const convertedCost = formatCost(10);

        //Assert
        expect(convertedCost).toBe("ISK 143");
    });

    test("Can convert price from NOK to DKK", () => {
        //Arrange
        const currencyString = "DKK";
        Store.dispatch("updateSelectedCurrency", currencyString);

        //Act
        const convertedCost = formatCost(10);

        //Assert
        expect(convertedCost).toBe("DKK 7.40");
    });

    test("Can convert price from NOK to GBP", () => {
        //Arrange
        const currencyString = "GBP";
        Store.dispatch("updateSelectedCurrency", currencyString);

        //Act
        const convertedCost = formatCost(10);

        //Assert
        expect(convertedCost).toBe("£0.84");
    });

    test("Can convert price from NOK to EUR", () => {
        //Arrange
        const currencyString = "EUR";
        Store.dispatch("updateSelectedCurrency", currencyString);

        //Act
        const convertedCost = formatCost(10);

        //Assert
        expect(convertedCost).toBe("€1.00");
    });
});

describe("Can check if user is authenticated", () => {
    test("Can get the loggedIn status", () => {
        //Arrange
        const loggedIn = false;
        Store.dispatch("updateLoggedIn", loggedIn);

        //Act
        const isLoggedIn = isUserAuthenticated();

        //Assert
        expect(isLoggedIn).toBe(false);
    });

    test("Can get the loggedIn status", () => {
        //Arrange
        const loggedIn = true;
        Store.dispatch("updateLoggedIn", loggedIn);

        //Act
        const isLoggedIn = isUserAuthenticated();

        //Assert
        expect(isLoggedIn).toBe(true);
    });
});

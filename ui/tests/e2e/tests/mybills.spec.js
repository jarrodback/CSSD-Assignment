describe("My Bills Tests", () => {
    before(() => {
        cy.login("test@email.com", "test1");
        cy.visit("/my-bills");
    });

    it("displays 6 rows in the bills table", () => {
        // Act
        cy.visit("/my-bills");
        // Assert
        cy.get("#bills-table").find("tbody tr").should("have.length", 6);
    });

    it("Entry Location filters the my bills table", () => {
        // Act
        cy.get("#bills-table")
            .get("#entry-location-filter")
            .type("Entry Location");

        // Assert
        cy.get("#bills-table")
            .find("tbody tr")
            .should("have.text", "No bills match the filter.");
        cy.get("#bills-table").get("#entry-location-filter").clear();
    });

    it("Exit Location filters the my bills table", () => {
        // Act
        cy.get("#bills-table")
            .get("#exit-location-filter")
            .type("Exit Location");

        // Assert
        cy.get("#bills-table")
            .find("tbody tr")
            .should("have.text", "No bills match the filter.");
        cy.get("#bills-table").get("#exit-location-filter").clear();
    });

    it("Car Registration Number filters the my bills table", () => {
        // Act
        cy.get("#bills-table")
            .get("#car-registration-filter")
            .type("Car Registration Number");

        // Assert
        cy.get("#bills-table")
            .find("tbody tr")
            .should("have.text", "No bills match the filter.");
        cy.get("#bills-table").get("#car-registration-filter").clear();
    });

    it("Should show more of the drivers bills on page 2", () => {
        // Act
        cy.get(
            '*[class^="custom-select custom-select-sm custom-select"]'
        ).select("5");
        cy.get('*[class^="page-link"]').contains("2").click();
        cy.wait(1000);
        // Assert
        cy.get("#bills-table").find("tbody tr").should("have.length", 1);
    });

    it("Should display a help page when the Help button is clicked in the navbar", () => {
        // Act
        cy.get("#support").click();

        // Assert
        cy.get('*[class^="mt-4"]')
            .find("h1")
            .should("have.text", "Frequently Asked Questions (FAQ)");
    });
});

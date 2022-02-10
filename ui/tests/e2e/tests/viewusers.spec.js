describe("My Users Tests", () => {
    before(() => {
        cy.adminLogin("operator@email.com", "test1");
    });

    it("displays two rows in the users table", () => {
        // Act
        cy.visit("/view-users");

        // Assert
        cy.get("#users-table").find("tbody tr").should("have.length", 2);
    });

    it("Username filters the my users table", () => {
        // Act
        cy.get("#users-table").get("#username-filter").type("Username");

        // Assert
        cy.get("#users-table")
            .find("tbody tr")
            .should("have.text", "No users match the filter.");
    });

    it("Email filters the my users table", () => {
        // Act
        cy.get("#users-table").get("#email-filter").type("Email");

        // Assert
        cy.get("#users-table")
            .find("tbody tr")
            .should("have.text", "No users match the filter.");
    });

    it("Clicking pay bill redirects to the users bill page", () => {
        // Act
        cy.get("#users-table")
            .get("#email-filter")
            .focus()
            .clear()
            .type("test@email.com");
        cy.get("#users-table").get("#username-filter").focus().clear();
        cy.get("#viewUserBills").click();

        // Assert
        cy.get("h1").should("have.text", "Displaying bills for test_username");
    });
});

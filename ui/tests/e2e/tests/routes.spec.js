describe("Bills Route Tests", () => {
    before(() => {
        cy.login("test@email.com", "test1");
    });

    it("loads the my bills page", () => {
        // Act
        cy.visit("/my-bills");

        // Assert
        cy.contains("h1", "My Bills");
    });

    it("bounces the root to the my bills page", () => {
        // Act
        cy.visit("/");

        // Assert
        cy.contains("h1", "My Bills");
    });

    it("loads the help page", () => {
        // Act
        cy.visit("/help");

        // Assert
        cy.contains("h1", "Frequently Asked Questions (FAQ)");
    });

    it("loads the all users page", () => {
        // Act
        cy.signOut();
        cy.adminLogin("operator@email.com", "test1");
        cy.visit("/view-users");

        // Assert
        cy.contains("h1", "View Users");
    });
});

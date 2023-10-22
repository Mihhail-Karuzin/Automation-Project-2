describe('Issue deletinig', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.get('[data-testid="board-list:backlog"]').children().eq(0).click();
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    });
  });

  //Assignment 3.

  //Test case 1.1
  it('Test case for deleting an issue', () => {

    let assertIssueDeleted = function (issueTitle) {

      // Assert that the issue with the given title is displayed in the Short summary field
      cy.get('[placeholder="Short summary"]').contains(issueTitle);

      // Click the delete issue button
      cy.get('[data-testid="icon:trash"]').click();

      // Confirm the deletion in the confirmation pop-up
      cy.get('[data-testid="modal:confirm"]').contains('Delete issue').click();

      // Assert that the deletion confirmation dialogue is not visible
      cy.get('[data-testid="modal:confirm"]').should('not.exist');

      // Reload the page
      cy.reload();

      // Assert that the issue is deleted and not displayed on the Jira board
      cy.contains('[data-testid="list-issue"]', issueTitle).should('not.exist');
    };

    // Call the function with the issue title to execute the assertions
    assertIssueDeleted("This is an issue of type: Task.");
  });

  // Test case 1.2
  it('Start issue delete process and verify issue is deleted', () => {

    let issueTitle;

    // Getting the issue details modal and working with it
    cy.get('[data-testid="modal:issue-details"]').should('be.visible').within(() => {

      // Extracting the issue title
      cy.get('[placeholder="Short summary"]').invoke('text').as('issueTitle');

      // Clicking the delete issue button
      cy.get('[data-testid="icon:trash"]').click();

    });

    // Confirming the deletion and verifying the confirmation dialogue is not visible
    cy.get('[data-testid="modal:confirm"]').contains('Delete issue').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');

    // Reloading the page
    cy.reload();

    // Asserting that the issue is deleted and not displayed on the Jira board
    cy.get('@issueTitle').then((issueTitle) => {
      cy.get('[data-testid="board-list:backlog"]').children().should('not.contain', issueTitle);
    });

  });

  //Test case 2.1
  it('Starting the deleting issue process, but cancelling this action', () => {

    let assertIssueNotDeleted = function (issueTitle) {


      // Assert that the issue with the given title is displayed in the Short summary field
      cy.get('[placeholder="Short summary"]').contains(issueTitle);

      // Click delete issue button
      cy.get('[data-testid="icon:trash"]').click();

      // Cancel the deletion in the confirmation pop-up
      cy.get('[data-testid="modal:confirm"]').contains('Cancel').click();

      // Assert that deletion confirmation dialogue is not visible
      cy.get('[data-testid="modal:confirm"]').should('not.exist');

      // Click the close icon on the modal
      cy.get('[data-testid="icon:close"]').first().click();

      //Reload the page
      cy.reload();

      // Assert that the issue is not deleted and still displayed on the Jira board
      cy.contains('[data-testid="list-issue"]', issueTitle).should('exist');
    };

    // Call the function with the issue title to execute the assertions
    assertIssueNotDeleted("This is an issue of type: Task.");

  });

  // Test case 2.2
  it('Start issue delete process and abort it,verify issue is not affected', () => {

    let issueTitle;

    // Getting the issue details modal and working with it
    cy.get('[data-testid="modal:issue-details"]').should('be.visible').within(() => {

      // Extracting the issue title
      cy.get('[placeholder="Short summary"]').invoke('text').as('issueTitle');

      // Clicking the delete issue button
      cy.get('[data-testid="icon:trash"]').click();
    });

    // Cancelling the deletion and verifying the confirmation dialogue is not visible
    cy.get('[data-testid="modal:confirm"]').contains('Cancel').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');

    // Reloading the page
    cy.reload();

    // Asserting that the issue is not deleted and still displayed on the Jira board
    cy.get('@issueTitle').then((issueTitle) => {
      cy.get('[data-testid="icon:close"]').first().click();
      cy.get('[data-testid="board-list:backlog"]').children().should('contain', issueTitle);

    });

  });

});







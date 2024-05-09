beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)

* Create tests to verify visual parts of the page:
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
 */

describe('Visual tests', () => {
    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that check boxes list is correct', () => {
        // Array of found elements with given selector has 2 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 2)

        // Verify labels of the checkboxes
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','Accept our cookie policy')

        //Verify default state of checkboxes
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')

        // Selecting one will not remove selection from the other checkboxes
        cy.get('input[type="checkbox"]').eq(0).check()
        cy.get('input[type="checkbox"]').eq(1).check()
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')

        cy.get('button').children().eq(0).should('be.visible')
        .and('have.attr', 'href', 'cookiePolicy.html')
        .click()
        cy.url().should('contain', '/cookiePolicy.html')
        cy.go('back')
        cy.log('Back again in registration form 3')
    })

    it('Email field test', () => {
        const validEmail = 'test@email.com'
        const invalidEmail = 'test"email.com'
        // Type valid email and assert that warning message is not visible
        cy.get('input[name=email]').type(validEmail)
        cy.get('input[name=email]').should('have.class', 'ng-valid-email')
        cy.get('#emailAlert').should('not.be.visible')
        // Type invalid email and assert that warning message is visible
        cy.get('input[name=email]').clear().type(invalidEmail)
        cy.get('#emailAlert').should('be.visible')


    })

    it('Country dropdown is correct', () => {

        cy.get('#country').children().should('have.length', 4)
        cy.get('#country').find('option').eq(0).should('have.text', '')

        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').select('Spain')
        cy.get('#city').should('be.visible')
        cy.get('#city').children().should('have.length', 5)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
        cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')

        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').select('Estonia')
        cy.get('#city').should('be.visible')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')


        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
        cy.get('#country').select('Austria')
        cy.get('#city').should('be.visible')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')

        })


})

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */
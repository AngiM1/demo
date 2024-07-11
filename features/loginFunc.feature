@basic_login
Feature: Successful login to FE

    Scenario Outline: User Login Functionality

        Given I am on the login page of the FE application
        And Store view switcher is available on the login page
        And Forgot password form is present
        And Password visibility switcher is present
        When I enter valid "<emailOrBusinessID>" and "<password>"
        And I click login button
        Then Account icon is present

        Examples:
            | emailOrBusinessID      | password     |
            | 9999999100             | Example2k24! |
            | 9999999101@Example.com | Example2k24! |
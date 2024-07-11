@headerfeature
Feature: Functional and visual aspects of the website's header

    @header_basic_elements_presence
    Scenario: All basic items included in design are present
        Given I am logged in to the website as a direct user with "9999999200" and "Example2k24!"
        Then Logo image is present
        And Search bar is present
        And View switch is present
        And My account button is present
        And Quote button is present
        And Cart button is present
        And Store switcher is present

    @header_active_customer_element
    Scenario Outline: Active customer element behavior based on user type
        Given I am logged in to the website as "<user_type>" with "<user_name>" and "<password>"
        When I place an "<order_type>" order as a "<user_type>" user and the active customer element "<expected_behavior>"

        Examples:
            | user_type | user_name  | password     | order_type    | expected_behavior                                           |
            | direct    | 9999999100 | Example2k24! | customer      | is present and indicates which customer is currently active |
            | direct    | 9999999200 | Example2k24! | replenishment | is not present                                              |
            | indirect  | 9999999102 | Example2k24! | replenishment | is not present                                              |
            | agent     | 9999999104 | Example2k24! | customer      | is used to switch between stores currently logged-in as     |
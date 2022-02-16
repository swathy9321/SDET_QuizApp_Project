Feature: Application Login

  Scenario: Home Page should be displayed
    Given Open the application
    When User enter username
    And User enter password
    And User click on login button
    Then page redirected to homepage



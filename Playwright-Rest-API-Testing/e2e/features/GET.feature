Feature: As an API I can retrieve posts

    As an API
    I can retrieve all the posts

    @dev
    Scenario: Retrieve all the posts
        Given I retrieve "posts"
        And The response was successful
        And The second response is successful
        Then The response status code is 200


# npm run cucumber -- --profile dev
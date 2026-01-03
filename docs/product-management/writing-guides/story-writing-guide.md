# Story Writing Rules

## Story Splitting

### Verticality
Each Story should be vertical, i.e. it should include all frontend and backend components required to deliver the story.

### Atomicity
Each Story should be atomic, i.e. it should be possible to create a release with just the story without breaking other functionality, and provide value to the user.

### Size
Each Story should be small enough to be completed within a sprint, which is to say an estimated difficulty of Medium or less.

## Story Content

### Story Template
Stories should follow the following template:

```
{{User Story}}
{{Acceptance Criteria}}
{{Screenshots}}
{{Definition of Done}}
{{Notes}}
```

### User Story
Each Story should be in the format "As a [userType], I want [action|interaction|information] so that [businessValue]."

- **[userType]**: The type of user. NEVER use "user" as a userType. Be specific and use the actual role of the user. Good examples: "Pet Owner", "Vet", "Carnival Clown".
- **[action|interaction|information]**: The action, interaction or information required for the user to achieve their goal. Bad examples: "add a pet", "a pet management page", "a pet list page". Good examples: "to register the details of my pet", "to update the details of my pet", "to see all of the pets that visit the clinic".
- **[businessValue]**: The business value of the story. This should be tangeable and ideally measurable. They should not just re-state the [action|interaction|information] or feature. Bad examples: "I can register the details of my pet", "user experience is improved", "more users use my app". Good examples: "the number of unique pets visiting the clinic per month increases", "monthly user complaints are reduced", "more pet owners interact with the app on a monthly basis". 

### Acceptance Criteria
Acceptance criteria should be in the format "Given [context], When [action], Then [result]". 

- **[context]**: The context in which the action takes place. Good examples: "data is loaded and rendered in the list", "the user is authenticated to edit the given pet's details", "the user does not have valid login credentials".
- **[action]**: The action taken by the user. Good examples: "the user clicks on a pet's name", "the user clicks on the 'save pet' button", "the user tries to log in". 
- **[result]**: The result of the action. Good examples: "the page navigates to the pet details page for the selected pet", "the pet's details are updated in the database", "the user receives an invalid login details message".

Acceptance criteria should be atomic, without using any "and" or "or" statements in the [context], [action] or [result].
Ideally no more than 5 acceptance criteria per story, with a HARD limit of 8.

Acceptance criteria should not cover non-functional requirements, such as performance, security, or accessibility, unless the story is directly and explicitly related to those requirements.

### Screenshots
Screenshots should be included in the story if they are relevant to the story, alternatively a link to a design file should be provided. This section can be ommitted if there are no UI changes.

### Definition of Done
The definition of done should be a checklist of items that include the following:

- All acceptance criteria are met
- The code is tested and passes all tests
- The code is committed to the repository
- The code is verified as working in a test environment
- The changes are documented

### Notes
Notes should be included for any other relevant information that is not covered by the above sections. This section can be ommitted.

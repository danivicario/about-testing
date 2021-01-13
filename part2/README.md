<img src="./public/img/logo.png" height="80" >

# Logos CMS

Welcome to the Busuu's Logos CMS project (front end)!

In case you need to change the available languages and other configurations in the future, please remember all this configurations are inside of the `src/config` folder.

## Dependencies

You will need [Docker Desktop](https://www.docker.com/products/docker-desktop) to build\run this project.

### `docker-compose run --rm logos-cms npm install`

Installs the application dependencies.

### `docker-compose up`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `docker-compose run --rm logos-cms npm test`

Launches the test runner in the interactive watch mode.

### `docker-compose run --rm logos-cms npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `docker-compose run --rm logos-cms npm run coverage`

Does a dry run of all the unit tests. This command will produce a coverage folder where you can see the current code coverage.

### `docker-compose run --rm logos-cms npm run coverageWatch`

Does a run of all the unit tests and waits for your changes in case you want to improve any test. This command will produce a coverage folder where you can see the current code coverage.

## Standards followed in this project

### Semantics

- W3c validator

### Logic

- Redux sagas
- Redux

### Presentation layers

- CSS / SASS Architecture based on 7-1 https://gist.github.com/rveitch/84cea9650092119527bc
- CSS naming convention based on BEM http://getbem.com/naming/

## Journeys

### Course creation

When creating a course, Logos follows the next internal steps:

1. The CourseCreationStage component lets you choose the main language and the interface languages.

2. When the "create course" button is clicked, the CourseCreationStage component disables the create course button and calls to createCourse that is in the NewCoursePanel actionCreators

3. onCreateCourse of NewCoursePanel actionCreators dispatches NewCoursePanelActions.COURSE_CREATE sending the requested learningLanguage and interfacesLnauges and it is captured by the Saga

4. The saga calls to its internal createCourse

5. createCourse of the saga calls to API.createCourse and once the course has been created it dispatches both NewCoursePanelActions.COURSE_CREATE_SUCCEEDED and NewCoursePanelActions.COURSE_CHANGE_STAGE

6. NewCoursePanelActions.COURSE_CREATE_SUCCEEDED is captured by the CourseSlice which sanitizes the received payload with the newly created course and puts it in the course branch of the state

7. Once the newly created course is in the state, the dispatched action NewCoursePanelActions.COURSE_CHANGE_STAGE updating the UISlice and moving the app to the edition stage

8. NewCoursePanel redirects to the correct course ID in the URL

9. App detects the route change and renders the CourseEdition component

10. CourseEdition has all the data it needs available in the state

### Course load

App -> calls to oneCourseRequest
sagas -> they load the course and one content -> UNCHANGED
courseSlice -> calls to putCourseIntoState

APICourseAdapter.ts
API

### Image creation process

1. POST media/image -> imageCategory sets the type of cropping, etc -> create branch -> returns CDN URL (fake)
2. POST /contents -> contentType image URL goes in imageLocationlizations for UI languages and in value the URL and that returns the ID
3. PUT /course pass the content ID to update the paywall and

### Components

App -> container with just routing


### Exercise examples

1. Flashcard: `http://localhost:3000/course/8ae2d4f5-25d0-48dd-a73f-faf2457c5456/content/ddb579b8-db27-4731-b267-c4f51615b3ae/exercise/true`

2. Tip: `http://localhost:3000/course/23b7858e-6628-4f8f-bd70-e9be417bd882/content/15e20b42-6b35-43b4-8449-f381dce3c79a/exercise/true`

    2b. Tip with examples being null: `http://localhost:3000/course/092e7158-909b-494e-8b89-9b3b6035d227/content/f3248cc8-1c6c-4aea-a433-99baaa23864c/exercise/true`

    2c. Tip without instructions: `http://localhost:3000/course/50da2720-1be2-4fbc-8559-f9bb015961c3/content/40fab997-26b1-447f-964c-87e73a4992d6/exercise/true`

    2d. Tip with many examples: `http://localhost:3000/course/50da2720-1be2-4fbc-8559-f9bb015961c3/content/72b1ceae-a250-4453-84d8-87a7fee7b7aa/exercise/true`

    2e. Tip without anything (must set text to null in the fixtures first): `http://localhost:3000/course/50da2720-1be2-4fbc-8559-f9bb015961c3/content/40fab997-26b1-447f-964c-87e73a4992d6/exercise/true`

    2f. Tip with multiple rows and columns (via `{type: "tip", "examples.row": {$gt: 2}, "examples.column": {$eq: 1}}`): `http://localhost:3000/course/e0540da5-5834-4e84-b3be-326fd7d47c67/content/b0ae45b6-a882-4482-9499-22b022c8e31e/exercise/true`

3. True false: `http://localhost:3000/course/e0540da5-5834-4e84-b3be-326fd7d47c67/content/0dce833e-5a07-45a0-b351-4a2eda9a49a7/exercise/true`

or

`http://localhost:3000/course/ca0f07df-0bad-4998-a38d-2d1c36bd4c22/content/1eff1d21-2b04-4050-a5ad-964506eafce2/exercise/true`

    True false container activity: `http://localhost:3000/course/e0540da5-5834-4e84-b3be-326fd7d47c67/content/4829f5d2-b750-43a9-88d7-3feccb56a693`


### Creating a new type of exercise

1. Create component, for example TrueFalseExercise by cloning an existing one like Exercises/FlashCard

2. Clone src/common/interfaces/exercises/Flashcard and assign it to the new exercise type

3. Create the right src/common/interfaces/exercises/LoadedExerciseInterface for the exercise

4. Create the right src/common/types exercise branches

5. Create its styles at src/scss/components/Exercises

6. Import them from src/scss/main.scss

7. Apply the new class name in the newly created component, and replace all the instances of the old className with the new component's class

8. Create the corresponding exercise interface `TrueFalseExerciseInterface` as in src/common/interfaces/exercises/TrueFalse/TrueFalseExerciseInterface.ts

9. Add the new type to src/common/interfaces/slices/UISliceInterface.ts and use it in the `visitedBranch`

10. Add the new type to src/common/utils/exercises/commonExerciseUtils.ts in findTranslationsAvailableForBranch

11. Add the new type to src/components/TranslationsPanel/TranslationsPanel.tsx `visitedBranch`

12. Add the new type to src/common/interfaces/exercises/LoadedExerciseInterface.ts

13. Add the new type to src/components/TranslationsPanel/actionCreators.ts `sendTranslationsBlockToServer`

14. Add the new exercise type in src/components/CourseEdition/CourseEdition.tsx like 

```
(loadedExercise?.exercise.type === ExerciseTypes.trueFalse && (
<TrueFalseExercise
    exercise={loadedExercise as LoadedTrueFalseExerciseInterface}
    onExerciseStateChange={(activeExerciseState: any) => {
    setActiveExerciseState(activeExerciseState);
    }}
/>
)))}
```

15. Add the new exercise type in src/components/CourseEdition/CourseEditionHelpers.tsx

16. Add `SectionActions.COURSE_EXERCISE_TIP_REQUEST_SUCCEEDED` type of event for the successful data retrieval of the saga. Example `COURSE_EXERCISE_TRUEFALSE_REQUEST_SUCCEEDED`

17. Add `SectionActions.COURSE_EXERCISE_TRUEFALSE_REQUEST_SUCCEEDED` corresponding section in src/redux/slices/courseSlice.ts

18. Add in `API.requestOneExercise` the corresponding exercise type

19. Add its corresponding section at requestOneExercise in src/sagas/sagas.ts

20. Repair the cloned exercise, for example src/components/Exercises/TrueFalse/TrueFalseExercise.tsx

21. Fix the `loadedExercise` discovery block 

```
const loadedExercise:
    | LoadedTipExerciseInterface
    | LoadedFlashCardExerciseInterface
    | LoadedTrueFalseExerciseInterface
```

22. Ensure that in the cloned exercise `src/components/Exercises/TrueFalse/TrueFalseExercise.tsx` there aren't broken references to `extractLocalizationOfLanguage` etc. Disable them temporarily so you can see the new type of exercise running and fix afterwards.

### Wiring a new type of exercise with its data model

1. Pay attention at the new exercise type interface `src/common/interfaces/exercises/TrueFalse/TrueFalseExerciseInterface.ts` and add all the new required fields under the `TrueFalseExerciseContent` section

2. Update `groupByLanguageInBranch` at `src/services/APIHelpers.ts` including the new exercise type



## Command to see all the components in the project

`find src/components -type d -print | grep -v img | grep -v static`
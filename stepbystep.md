Template for Building React/ Redux Projects
Planning Stage 📐
Step 1 - Draw All of the Views of the App
We need to determine the look and functionality of each view in your app. One of the best approaches is to draw each view of the app on paper so that you'll have a good idea of what information and data you're planning to have on each page.

Instead of paper and pencil, you can be a bit more digital and use software for creating mockups. If you were given project specifications, check your mock against them to make sure that you have all of the required features.

Step 2 - Break Each View Into a Hierarchy of Components
For this step,

draw boxes around every component; and
arrange the components into a hierarchy
Step 3 - Determine What Events Happen in the App
We need to take a look at what is happening in each component. Let's determine what actions the app or the user is performing on the data. Is the data being set, modified, or deleted?...then we'll need an action to keep track of that event!

Step 4 - Determine What Data Lives in the Store
Remember that the main problems that Redux (and the react-redux bindings!) was meant to solve were:

Propagation of props through the entire component tree.
Ensuring consistency and predictability of the state across the app.
According to Dan Abramov, the creator of Redux, we should follow the following principle for determining whether to store a piece of data in the store or in a React component:

"Use Redux for state that matters globally or is mutated in complex ways… The rule of thumb is: do whatever is less awkward."

Take a look at Organizing State and How to choose between Redux's store and React's state? for further information about this.

Coding Stage🔨
Step 1 - Design the shape of the state and create reducers.

Step 2 - Create a Redux store. Connect logger middleware (optional) and Redux Thunk middleware (alternatively, you can use Redux Saga, etc.).

Step 3 - For each view that needs access to the store, create the component and connect it to the store.

Step 4 - For the component you created in the last step, create actions and action creators. Check that everything works correctly.

Step 5 - Repeat Step 3 & Step 4 for each component that needs access to the store.

Step 6 - Create presentational components and confirm that everything works correctly.

Step 7 - Add React Router.

Step 8 - Add finishing touches and make sure the project meets the rubric.

Remember, this is just a template. As you build more projects, you'll modify this template to suit your needs. You may also find it more intuitive to use a different approach. Regardless of the approach you take, however, planning out your app is imperative to success.
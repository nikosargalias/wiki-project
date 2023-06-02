## running frontend

First, run the development server:

-   npm install
-   npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## running server (using docker container)

-   cd into /server repository
-   npm install
-   docker build -t my_python_app .
-   docker run -v .:/app -p 5003:5003 my_python_app

# Documentation

## Project Description

This project presents a web-based document system built with Next.js and React for rendering and editing Markdown documents. The system allows users to view the history of document revisions and submit new revisions. This system aims to provide a smooth user experience for managing documents while preserving the history of changes.

## Benefits of the System Design and Technologies Used

This project leverages numerous solid system design principles, making it both scalable and maintainable.

Firstly, the project employs a well-structured and intuitive folder structure. This good practice is essential for codebase clarity and easier navigation, especially in larger projects with several components and modules. Files are organized by their functionality, with a clear distinction between pages, components, and utilities, which makes it easy for developers to locate specific pieces of code.

Secondly, the project adheres to the principle of modularity, dividing the application into small, self-contained modules. Each component is designed to do a single task effectively, reducing complexity and improving reusability. This approach allows easy addition, replacement, or modification of individual modules, making the system scalable and easier to understand and maintain.

Furthermore, the project divides components into core and shared categories. Core components handle specific, application-related tasks, whereas shared components are general-purpose, reusable across different parts of the application. This separation helps to maintain a clean, organized codebase and promotes the reuse of components, enhancing code maintainability and efficiency.

Each component is designed to be stateless as much as possible, receiving data through props and emitting changes via events. This design principle decouples the component's behavior from its state, making it more predictable, easier to test, and can be used in different contexts.

Additionally, for projects of a larger scale managing substantial shared state, a centralized state management solution such as React Context or Redux becomes a more appropriate choice. While this project uses component-level state management via React's useState and useEffect hooks, more complex applications can benefit from a unified, predictable state container.

## Good Patterns Used and Why

### Modular design

The use of functional components along with React Hooks makes the code more modular, readable and easier to test and debug. It also reduces the chances of bugs related to this keyword and lifecycle methods.

### Separation of Concerns

The application logic is separated into distinct components and utility functions, each responsible for a single concern. This separation of concerns makes the code easier to understand, test, and maintain.

### Mocking for Testing

Mocking external modules and dependencies during testing ensures that tests run quickly and aren't affected by the reliability of external systems.This waas used to ensure stability within the tests.

## Suggestions for Future Improvements

### Error handling

The project incorporates basic error handling, which is crucial for any production-level application. However, for a more resilient application, it's recommended to use a global error handling strategy. This can be accomplished with React Error Boundaries, which are components designed to catch JavaScript errors anywhere in their child component tree. These boundaries log the errors and display a fallback UI, providing a smooth user experience even when something goes wrong.

In addition to the localized error handling, errors can be reported to an error logging service such as Azure Application Insights. This robust application performance management service is part of Azure Monitor and can help monitor the application's live performance, detect anomalies, and collect data about application usage, availability, and errors. Incorporating such a service ensures better visibility into the application's performance and any occurring errors, making the application not only more resilient but also more maintainable and monitorable.

### Testing Coverage

While there are some tests implemented, and I focused on testing the [id] file thoroughly, increasing testing coverage, including more edge cases and error states would lead to a more reliable application. I would also ensure we have strong e2e tests, covering the entire application from a user experience point of view. Finally, I would aim to have 100% test coverage for all endpoints, ensuring mocks are provided by the API, and used inside mock handlers for tests which assert on the request response cycle of each endpoint.

### UI/UX Improvements

The interface could be made more intuitive and user-friendly. A modern CSS framework of paradigm can be used, options such as CSS modules, Styled Components, or perhaps a UI library such as ChakraUI. The current UI is quite basic and there's a lot of room for improvements. Ideally, keeping components small, reusable modules with themes / styles in place is the ideal approach to maintin scallability and modularity.

## Accessibility Improvements

In any application, it's crucial that all users, regardless of ability or disability, have an equally enjoyable and efficient user experience. Given more time, I would focus on enhancing the accessibility of this project by paying attention to the following aspects:

-   Semantic HTML: Strengthen the use of semantic HTML tags to ensure a clear and coherent structure of the content. This would improve how assistive technologies like screen readers interpret the content.

-   Keyboard Navigation: Implement full keyboard navigability across the site. Ensuring that every feature can be accessed using the keyboard alone would be beneficial for users who can't or prefer not to use a mouse.

-   Contrast Ratio: ensure text-to-background contrast ratios across the application meet WCAG standards.

-   Accessible Forms: Associate form labels explicitly with their respective elements. Provide clear and specific error and success messages for form interactions.

-   Dynamic Content Updates: changes to content, particularly dynamic ones, are announced to the user or are readable by screen readers, making the site more usable for those using assistive technologies.

-   ARIA Attributes: Extend the use of ARIA (Accessible Rich Internet Applications) attributes to provide extra context and make navigation easier for those using assistive technologies.

-   Accessibility Auditing: Regular audits with accessibility tools such as Lighthouse and Axe to identify and fix potential issues would be an ongoing effort. This can be automated with an e2e testing suite such as Cypress.

### Optimize Data Fetching

Data fetching could be optimized by only re-fetching data when necessary, using pagination for long lists of revisions, and implementing caching. Catching could be implemented with something such as react query or SWR.

### Implementing Authentication

Currently, there is no authentication system in place. Implementing an authentication and authorization system would allow for user-specific documents and revisions, and would improve the security of the application.

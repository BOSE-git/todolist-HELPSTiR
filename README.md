
# Todo List Application



## Overview

The Todo List application is a feature-rich and user-friendly tool designed to help manage daily tasks efficiently. Built with React, this application allows users to add, edit, delete, mark tasks as completed, and search through tasks. The application ensures a smooth and interactive user experience, leveraging React's state management and local storage for persistent task data.
## System Design

### Architecture

- The system is designed with modularity and scalability in mind. The primary components include:
- App Component: Manages the overall state and coordinates interactions between other components.
- TaskForm Component: Handles task creation and editing through a user-friendly form interface.
- SearchBar Component: Provides a search functionality to filter tasks based on the user's input.
- TodoList Component: Renders the list of tasks, utilizing the TodoItem component for each task.
- TodoItem Component: Represents individual tasks with options for completion, editing, and deletion.

### State Management

State is managed using React's useState and useEffect hooks:

- taskList: Stores the list of tasks, initially populated from local storage or a dummy data file.
- isEditing: Tracks whether a task is being edited.
- currentTaskId: Stores the ID of the task currently being edited.
- searchInput: Stores the current search query.
- expandedTaskId: Manages the ID of the task currently expanded to show more details.

### Persistence
Task data is stored in the browser's local storage to ensure that tasks persist between sessions. Any changes to the task list are automatically saved to local storage.
## Implementation

### Key Features
- Add Task: Users can add new tasks with a title and description.
- Edit Task: Users can edit existing tasks.
- Delete Task: Users can delete tasks they no longer need.
- Mark as Completed: Users can mark tasks as completed, helping to keep track of progress.
- Search Task: Users can search for tasks based on the title and description, with results dynamically filtered.
- Expandable List: Each task can be expanded to show additional details like the description and timestamp.
### Code Structure
- App.jsx: The main component that initializes state, handles core functionalities, and renders child components.
- TaskForm.jsx: A form component for creating and updating tasks, with dynamic inputs based on editing state.
- SearchBar.jsx: A component providing search functionality, updating the URL to reflect search queries.
- TodoList.jsx: A component that maps over the task list and renders individual TodoItem components.
- TodoItem.jsx: A component representing each task, with controls for completing, editing, deleting, and expanding tasks.
## Setup and Run Instructions

Follow these steps to set up and run the application:

- Clone the repository:
  - ```git clone https://github.com/your-username/todo-list-app.git```
- Navigate to the project directory:
  - ```cd todo-list-app```
- Install dependencies:
  - ```npm install```
- Start the application:
  - ```npm start```
- Open the application:
  - Open your browser and go to http://localhost:3000 to see the application running.
## Detailed Component Description

### App.jsx
The App component is the heart of the application. It initializes and manages the main state, including task list, search input, and edit states. It also handles all CRUD operations and search functionality.

### TaskForm.jsx
The TaskForm component provides an intuitive interface for adding and editing tasks. It dynamically adjusts its fields and buttons based on whether a task is being edited or newly created.

### SearchBar.jsx
The SearchBar component facilitates easy searching of tasks. It updates the search query in the URL and interacts with the App component to filter the displayed tasks accordingly.

### TodoList.jsx
The TodoList component receives the filtered list of tasks from the App component and maps over it to render each task using the TodoItem component.

### TodoItem.jsx
The TodoItem component represents individual tasks in the list. It provides checkboxes for marking tasks as completed, buttons for editing and deleting tasks, and functionality to expand and show additional task details.


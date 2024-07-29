const tasks = [
    {
        id: crypto.randomUUID(),
      title: "Task 1",
      description: "Description for task 1",
      timestamp: new Date().toLocaleString(),
      completed: false
    },
    {
        id: crypto.randomUUID(),
      title: "Task 2",
      description: "Description for task 2",
      timestamp: new Date().toLocaleString(),
      completed: false
    },
    {
        id: crypto.randomUUID(),
      title: "Task 3",
      description: "Description for task 3",
      timestamp: new Date().toLocaleString(),
      completed: false
    },
  ];

  export default tasks;
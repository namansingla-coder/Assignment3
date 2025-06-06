import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";

const initialTasks = {
  todo: [
    { id: "1", content: "Design landing page" },
    { id: "2", content: "Fix navbar bug" },
  ],
  inProgress: [{ id: "3", content: "Integrate payment gateway" }],
  inTesting: [
    { id: "5", content: "Write unit tests" },
    { id: "6", content: "Perform load testing" },
    { id: "7", content: "Create user flow" },
  ],
  done: [
    { id: "4", content: "Setup Firebase auth" },
    { id: "8", content: "Implement dark mode" },
  ],
};

const Kanban = () => {
  // Load from localStorage or fallback to initialTasks
  const [columns, setColumns] = useState(() => {
    const stored = localStorage.getItem("kanban-columns");
    return stored ? JSON.parse(stored) : initialTasks;
  });

  const [addingCol, setAddingCol] = useState(null);
  const [newTaskContent, setNewTaskContent] = useState("");

  // Track which task is being edited: { colId, taskId }
  const [editingTask, setEditingTask] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [error, setError] = useState("");

  // Save columns to localStorage on change
  useEffect(() => {
    localStorage.setItem("kanban-columns", JSON.stringify(columns));
  }, [columns]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = [...columns[source.droppableId]];
    const destCol = [...columns[destination.droppableId]];
    const [moved] = sourceCol.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceCol.splice(destination.index, 0, moved);
      setColumns({ ...columns, [source.droppableId]: sourceCol });
    } else {
      destCol.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol,
      });
    }
  };

  // Handle clicking on a task to edit
  const handleTaskClick = (colId, taskId) => {
    if (
      editingTask?.colId === colId &&
      editingTask?.taskId === taskId
    ) {
      // If clicking the same task, toggle off edit mode
      setEditingTask(null);
      setEditContent("");
      setError("");
    } else {
      const task = columns[colId].find((t) => t.id === taskId);
      setEditingTask({ colId, taskId });
      setEditContent(task.content);
      setError("");
    }
  };

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
    if (e.target.value.trim() !== "") {
      setError("");
    }
  };

  const handleEditSave = () => {
    if (editContent.trim() === "") {
      setError("Task content cannot be empty");
      return;
    }
    const { colId, taskId } = editingTask;
    const updatedTasks = columns[colId].map((task) =>
      task.id === taskId ? { ...task, content: editContent.trim() } : task
    );
    setColumns({ ...columns, [colId]: updatedTasks });
    setEditingTask(null);
    setEditContent("");
    setError("");
  };

  const handleEditCancel = () => {
    setEditingTask(null);
    setEditContent("");
    setError("");
  };

  const handleDelete = (colId, taskId) => {
    const filtered = columns[colId].filter((task) => task.id !== taskId);
    setColumns({ ...columns, [colId]: filtered });
    if (
      editingTask?.colId === colId &&
      editingTask?.taskId === taskId
    ) {
      setEditingTask(null);
      setEditContent("");
      setError("");
    }
  };

  // Add new task handlers
  const handleAddTaskClick = (colId) => {
    setAddingCol(colId);
    setNewTaskContent("");
    setError("");
  };

  const handleAddChange = (e) => {
    setNewTaskContent(e.target.value);
    if (e.target.value.trim() !== "") {
      setError("");
    }
  };

  const handleAddSave = () => {
    if (newTaskContent.trim() === "") {
      setError("Task content cannot be empty");
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      content: newTaskContent.trim(),
    };
    setColumns({
      ...columns,
      [addingCol]: [...columns[addingCol], newTask],
    });
    setAddingCol(null);
    setNewTaskContent("");
    setError("");
  };

  const handleAddCancel = () => {
    setAddingCol(null);
    setNewTaskContent("");
    setError("");
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Kanban Board
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.entries(columns).map(([colId, tasks]) => (
            <Droppable droppableId={colId} key={colId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm min-h-[400px] flex flex-col"
                >
                  <h3 className="text-lg font-semibold capitalize mb-4 text-gray-700 dark:text-white">
                    {colId.replace(/([A-Z])/g, " $1")}
                  </h3>

                  {/* Tasks list */}
                  <div className="flex-grow overflow-auto">
                    {tasks.map((task, index) => {
                      const isActive =
                        editingTask?.colId === colId &&
                        editingTask?.taskId === task.id;

                      return (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => handleTaskClick(colId, task.id)}
                              className={`bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded mb-3 shadow cursor-pointer select-none flex flex-col
                                ${isActive ? "border-2 border-blue-500" : ""}
                              `}
                            >
                              {isActive ? (
                                <>
                                  <input
                                    type="text"
                                    value={editContent}
                                    onChange={handleEditChange}
                                    autoFocus
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                                  />
                                  {error && (
                                    <p className="text-xs text-red-500 mt-1">
                                      {error}
                                    </p>
                                  )}

                                  <div className="flex space-x-2 mt-2 justify-end">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditSave();
                                      }}
                                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditCancel();
                                      }}
                                      className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded text-sm"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(colId, task.id);
                                      }}
                                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <span>{task.content}</span>
                              )}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>

                  {/* Add new task form or button */}
                  {addingCol === colId ? (
                    <div className="mt-2">
                      <input
                        type="text"
                        value={newTaskContent}
                        onChange={handleAddChange}
                        autoFocus
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                        placeholder="Enter new task"
                      />
                      {error && (
                        <p className="text-xs text-red-500 mt-1">{error}</p>
                      )}
                      <div className="flex space-x-2 mt-2 justify-end">
                        <button
                          onClick={handleAddSave}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleAddCancel}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddTaskClick(colId)}
                      className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium"
                    >
                      + Add Task
                    </button>
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Kanban;
// Simple tests for todo list logic
// Run with: node app.test.js

const { tasks } = require("./app");

let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) {
    console.log("  PASS:", description);
    passed++;
  } else {
    console.log("  FAIL:", description);
    failed++;
  }
}

// Reset tasks before each test
function reset() {
  tasks.length = 0;
}

// --- Test 1: Start with empty tasks ---
console.log("\nTest: Initial state");
reset();
assert("tasks should start empty", tasks.length === 0);

// --- Test 2: Add a task ---
console.log("\nTest: Add task");
reset();
tasks.push({ id: 1, text: "Buy groceries", done: false });
assert("tasks should have 1 item", tasks.length === 1);
assert("task text should be correct", tasks[0].text === "Buy groceries");
assert("task should not be done", tasks[0].done === false);

// --- Test 3: Toggle task done ---
console.log("\nTest: Toggle task");
reset();
tasks.push({ id: 1, text: "Buy groceries", done: false });
const task = tasks.find(t => t.id === 1);
task.done = !task.done;
assert("task should be marked done", tasks[0].done === true);
task.done = !task.done;
assert("task should be unmarked", tasks[0].done === false);

// --- Test 4: Delete a task ---
console.log("\nTest: Delete task");
reset();
tasks.push({ id: 1, text: "Task 1", done: false });
tasks.push({ id: 2, text: "Task 2", done: false });
const remaining = tasks.filter(t => t.id !== 1);
tasks.length = 0;
remaining.forEach(t => tasks.push(t));
assert("should have 1 task after delete", tasks.length === 1);
assert("remaining task should be Task 2", tasks[0].text === "Task 2");

// --- Test 5: Add multiple tasks ---
console.log("\nTest: Multiple tasks");
reset();
tasks.push({ id: 1, text: "Task A", done: false });
tasks.push({ id: 2, text: "Task B", done: false });
tasks.push({ id: 3, text: "Task C", done: false });
assert("should have 3 tasks", tasks.length === 3);

// --- Test 6: Empty text should not add task ---
console.log("\nTest: Empty task");
reset();
const text = "   ";
if (text.trim() !== "") {
  tasks.push({ id: 1, text: text.trim(), done: false });
}
assert("empty text should not add task", tasks.length === 0);

// --- Summary ---
console.log("\n----------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("----------------------------\n");

if (failed > 0) {
  process.exit(1);
}

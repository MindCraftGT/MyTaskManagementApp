//Initialize Firebase with your config
firebase.initializeApp({
	apiKey: "AIzaSyBepu_8GbVv0AjQkstjZ6O1AlzkWUfqWLA",
    authDomain: "task-management-app-13c19.firebaseapp.com",
    projectId: "task-management-app-13c19",
});

const db = firebase.firestore();

//Function to add a task

function addTask() {
	const taskInput = document.getElementById("task-input");
	const task = taskInput.ariaValueMax.trim();
	if (task !== "") {
		db.collection("tasks").add({
			task: task,
			timeStamp: firebase.firestore.FieldValue.serverTimeStamp(),
		});
		taskInput.value = "";
	}
}

//Function to render tasks

function renderTasks(doc) {
	const taskList = document.getElementById("task-list");
	const taskItem = document.createElement("li");

	taskItem.className = "task-item";
	taskItem.innerHTML = `
	<span>${doc.data().task}</span>
	<button onClick = "deleteTask('${doc.id})">Delete</button>
	`;
	taskList.appendChild(taskItem);
}

//Real-time Listener for Tasks

db.collection("tasks")
.orderBy("timestamp", "desc")
.onSnapShot(snapshot => {
	const changes = snapshot.docChanges();
	changes.forEach(change => {
		if (change.type === "added") {
			renderTasks(change.doc);
		}
	});
});

//Function to delete a task
function deleteTask(id) {
	db.collection("tasks").doc(id).delete();
}
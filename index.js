
var tasks = [
	{ id: "icon_1", icon: "fa-sun-o", name: "My Day" , fixed: true, appearance: "My Day" , extra:[]},
	{ id: "icon_2", icon: "fa-star-o", name: "Important" , fixed: true, appearance: "Important", extra:[]},
	{ id: "icon_3", icon: "fa-calendar", name: "Planned" , fixed: true, appearance: "Planned" , extra:[]},
	{ id: "icon_4", icon: "fa-user-o", name: "Assigned to you" , fixed: true, appearance: "Assigned to you", extra:[] },
	{ id: "icon_5", icon: "fa-home", name: "Tasks" , fixed: true, appearance: "Tasks", extra:[], color:'grey'}
];

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var extra;
function showLeftContents() {

	var ul = document.getElementById("add-tasks");
	for(var j = 0; j < 5; j++) {
		var i = document.createElement("i");
		var li = document.createElement("li");
		var p = document.createElement("p");
	    var id = tasks[j].id ;
		li.setAttribute("id", id);
		p.setAttribute("id", id + "p");
		i.classList.add("fa", tasks[j].icon);
		p.textContent = tasks[j].name;
		li.appendChild(i);
		li.appendChild(p);
		ul.appendChild(li);

	}
	
}
	
function addNewTasks(text, event) {
	if(event.keyCode == 13) {
		var taskName = text.value;
		if(taskName == "") {
			if(event.target.id == "add-new-list") {
				taskName = "Untitled Task";
			}
		}
		var count = 0;
		var timelist = [];
		for( var j = 5; j < tasks.length; j++) {
			if(tasks[j].name == taskName && tasks[j].fixed == false) {
				timelist.push(tasks[j].timestamp);
			    count += 1;
			}
		}
		var id = "a" + new Date().valueOf();
		var newTask = new Object();
		newTask.id = id;
		newTask.icon = "fa-list-ul";
		newTask.name = taskName;
		newTask.fixed = false;
		var position = 0;
		
		if (count > 0) {
			for(var m = 0; m <= count; m++) {
				var flag = 0;
				for(var n = 0; n < timelist.length; n++) {
					if(timelist[n] != m)
						flag += 1;
					}
				if(flag == count){
					position = m;
					break;
				}
			}
		}
		if (position > 0){
			newTask.timestamp = position;
			taskName = taskName + " (" + position + ")";
		}
		else {
			newTask.timestamp = 0;

		}
		newTask.appearance = taskName;
		newTask.color = "black";
		newTask.extra = [];
		tasks.push(newTask);
		var i = document.createElement("i");
		i.classList.add("fa", "fa-list-ul", "icon-blue");
		i.setAttribute("id", id + "i");
		var ul = document.getElementById("add-tasks");
		var li = document.createElement("li");
		li.style.color = "black";
		var p = document.createElement("p");
		p.setAttribute("class", "item-names");
		p.setAttribute("id", id + "p");
		li.setAttribute("id", id);
		li.setAttribute("class", "newtasks");
		p.textContent = taskName;
		li.appendChild(i);
		li.appendChild(p);
		ul.appendChild(li);
		document.getElementById("add-new-list").value = "";
		document.getElementById("task-name").textContent = taskName;
		document.getElementById("task-name").style.display = "block";
	 	document.getElementById("tasks-right-new").style.display = "block";
	 	document.getElementById("edit").style.display = "none";
	 	document.getElementById("share-icon").style.display = "block";
	 	displayExtraTask();

	}
}

var index = 0;
var nameOfTheTask;
var indexInTasks;
var elementIndex = 0;

function checkingRightClick(event) {
	var mouseNumber = event.buttons;
	if( mouseNumber == 2){
		var index = 0;
		var clickedId;
		if(event.target.tagName.toLowerCase() == "p" || event.target.tagName.toLowerCase() == "i") {
			clickedId = event.target.parentNode.id;
		}
		else {
			clickedId = event.target.id;
		}
		var element = document.getElementById(clickedId);
		document.getElementById("pop-up").style.display = "none";
		document.getElementById("pop-up-for-task").style.display = "none";
		nameOfTheTask = event.target.textContent;
		for(var j = 4; j < tasks.length; j++) {
			if(tasks[j].id == clickedId ) {
				index = j;
				break;
			}
		}
		elementIndex = index;
		var xCoOrdinate = event.clientX;
		var yCoOrdinate = event.clientY;
		if (yCoOrdinate + 180 > 600)
			yCoOrdinate -= 180;
		if (elementIndex > 4) {
			
			var element = document.getElementById("pop-up");
			element.style.display = "block";
			element.style.left = xCoOrdinate + 'px';
			element.style.top = yCoOrdinate + 'px';
			document.getElementById("task-name").textContent = nameOfTheTask;
			document.getElementById("task-name").style.display = "block";
	 		document.getElementById("tasks-right-new").style.display = "block";
	 		document.getElementById("edit").style.display = "none";
	 		document.getElementById("share-icon").style.display = "block";
		}
		if (elementIndex == 4) {
			var element = document.getElementById("pop-up-for-task");
			element.style.display = "block";
			element.style.left = xCoOrdinate + 'px';
			element.style.top = yCoOrdinate + 'px';
			document.getElementById("task-name").textContent = "Tasks";
			document.getElementById("task-name").style.display = "block";
	 		document.getElementById("tasks-right-new").style.display = "block";
	 		document.getElementById("edit").style.display = "none";
	 		document.getElementById("share-icon").style.display = "none";

		}
		document.getElementById("task-name").style.color = tasks[elementIndex].color;
		extra = false;
		displayExtraTask();

	}
}

function deleteTask() {
	var dialog = document.getElementById("confirmDelete");
	var main = document.getElementById("body-content");
	main.classList.add("blur");
	nameOfTheTask = document.getElementById("task-name").textContent;
	for(var j = 5; j < tasks.length; j++) {
		
		if(tasks[j].appearance == nameOfTheTask ) {
			indexInTasks = j;
			break;
		}
	}
	var customText = document.getElementById("custom-text");
	customText.textContent = "\"" + nameOfTheTask + "\"" + " will be permanently deleted";
	dialog.style.display = "block";
	document.getElementById("pop-up").style.display = "none";
	document.getElementById("listOptions").style.display = "none"; 

}

function confirmed() {
	if(isextra) {
		tasks[indexInTasks].extra.splice(taskId,1);
	}
	else  {
		var ul = document.getElementById("add-tasks");
		var id = tasks[indexInTasks].id;
		var item = document.getElementById(id);
		ul.removeChild(item);
		tasks.splice(indexInTasks,1);
		
		if (indexInTasks-1 < 4) {
			document.getElementById("task-name").textContent = "";
			document.getElementById("task-name").style.display = "none";
		 	document.getElementById("tasks-right-new").style.display = "none";

		}
		else {
			document.getElementById("task-name").textContent = tasks[indexInTasks - 1].appearance;
			document.getElementById("task-name").style.display = "block";
		 	document.getElementById("tasks-right-new").style.display = "block";
		 	if (indexInTasks - 1 == 4) {
		 		document.getElementById("share-icon").style.display = "none";
		 	}

		}
	}
	document.getElementById("body-content").classList.remove("blur");
	document.getElementById("confirmDelete").style.display = "none";
	displayExtraTask();
}


function canceled() {
	document.getElementById("confirmDelete").style.display = "none";
	document.getElementById("body-content").classList.remove("blur");
}

function changeRight(event) {
	
	if(event.target.tagName.toLowerCase() == "p" || event.target.tagName.toLowerCase() == "i") {
		   var	id = event.target.parentNode.id;
	}
	else 
		var id = event.target.id ;
	if (id.startsWith("a")) {
	 	document.getElementById("task-name").textContent = document.getElementById(id).textContent;
	 	document.getElementById("tasks-right-new").style.display = "block";
	 	document.getElementById("share-icon").style.display = "block";
	 	document.getElementById("share-today").classList.remove("fa-lightbulb");
	 	document.getElementById("share-today").classList.add("fa-user-plus");
	 	document.getElementById("share-today-text").textContent = "Share";
	 	document.getElementById("dayAndDate").textContent = "";
	 	document.getElementById("sort-icon").style.display = "block";

	 }
	if(id == "icon_5") {
		document.getElementById("task-name").textContent = "Tasks";
		document.getElementById("task-name").style.display = "block";
	 	document.getElementById("tasks-right-new").style.display = "block";
	 	document.getElementById("edit").style.display = "none";
	 	document.getElementById("share-icon").style.display = "none";
	 	document.getElementById("dayAndDate").textContent = "";
	 	document.getElementById("sort-icon").style.display = "block";

	}
	if(id == "icon_1") {
		document.getElementById("task-name").textContent = "My Day";
		document.getElementById("task-name").style.display = "block";
	 	document.getElementById("tasks-right-new").style.display = "block";
	 	document.getElementById("edit").style.display = "none";
	 	document.getElementById("share-icon").style.display = "block";
	 	document.getElementById("share-today").classList.remove("fa-user-plus");
	 	document.getElementById("share-today").classList.add("fa-lightbulb");
	 	document.getElementById("share-today-text").textContent = "Today";
	 	var d = new Date();
	 	var month = months[d.getMonth()];
	 	var day = days[d.getDay()];
	 	var date = d.getDate();
	 	document.getElementById("dayAndDate").textContent = day + ", " + month + " " + date;
	 	document.getElementById("sort-icon").style.display = "block";
	}
	if(id == "icon_2") {
		document.getElementById("task-name").textContent = "Important";
		document.getElementById("task-name").style.display = "block";
	 	document.getElementById("tasks-right-new").style.display = "block";
	 	document.getElementById("edit").style.display = "none";
	 	document.getElementById("share-icon").style.display = "none";
	 	document.getElementById("sort-icon").style.display = "none";
	 	document.getElementById("dayAndDate").textContent = "";

	}
	if(id == "icon_3") {
		document.getElementById("task-name").textContent = "Planned";
		document.getElementById("task-name").style.display = "block";
	 	document.getElementById("tasks-right-new").style.display = "block";
	 	document.getElementById("edit").style.display = "none";
	 	document.getElementById("share-icon").style.display = "none";
	 	document.getElementById("sort-icon").style.display = "none";
	 	document.getElementById("dayAndDate").textContent = "";

	}
	var content = document.getElementById("task-name").textContent;
	for ( var i = 0; i < tasks.length; i++) {
		if ( tasks[i].appearance == content) {
			document.getElementById("tasks-right-new").style.color = tasks[i].color;
		}
	}
	
	displayExtraTask();
}

function createEditable(event) {
	var editContent = document.getElementById("task-name");
	if (editContent.textContent == "Tasks") {

	}
	else {
		var inputField = document.getElementById("edit");
		inputField.setAttribute("value",editContent.textContent);
		editContent.style.display = "none";
		inputField.style.display = "block";
		inputField.focus();
		inputField.select();
	}
	document.getElementById("listOptions").style.display = "none";
}

function editTaskName(text, event) {
	if(event.keyCode == 13) {
		var newName = text.value;
		var pTag = document.getElementById("task-name");
		var inputTag = document.getElementById("edit");
		var oldName = pTag.textContent;
		if (newName.trim() == "" || newName == oldName) {
			pTag.textContent = oldName;
			pTag.style.display = "block";
			inputTag.style.display = "none";

		}
		else {
			var indexInTasks;
			var idOfItem;
			var appearance;
			for(var j = 5; j < tasks.length; j++) {
				if(tasks[j].appearance == oldName ) {
					indexInTasks = j;
					idOfItem = tasks[j].id;
					break;
				}
			}
			tasks[indexInTasks].name = newName;
			var count = 0;
			var position = 0;
			var timelist = [];
			for( var j = 5; j < tasks.length; j++) {
				if(tasks[j].name == newName &&  j != indexInTasks) {
					timelist.push(tasks[j].timestamp);
			    	count += 1;
				}
			}
			
			if (count > 0) {
				for(var m = 0; m <= count; m++) {
					var flag = 0;
					for(var n = 0; n < timelist.length; n++) {
						if(timelist[n] != m)
							flag += 1;
						}
					if(flag == count){
						position = m;
						break;
					}
				}
			}
			if (position > 0){
				tasks[indexInTasks].timestamp = position;
				newName = newName + " (" + position + ")";
			}
			else {

				tasks[indexInTasks].timestamp = 0;

			}
			tasks[indexInTasks].appearance = newName;
			document.getElementById(idOfItem+"p").textContent = newName;
			document.getElementById("task-name").textContent = newName;
			document.getElementById("task-name").style.display = "block";
	 		document.getElementById("tasks-right-new").style.display = "block";
	 		document.getElementById("edit").style.display = "none";
		}

	}
}



function showListOptions() {
	var xCoOrdinate = event.clientX - 90;
	var yCoOrdinate = event.clientY + 15;
	var element = document.getElementById("listOptions");
	if(element.style.display == "none")
		element.style.display ="block";
	element.style.display = "block";
	element.style.left = xCoOrdinate + 'px';
	element.style.top = yCoOrdinate + 'px';
	if (document.getElementById("task-name").textContent == "Tasks") {
		document.getElementById("renameList").style.display = "none";
		document.getElementById("deleteList").style.display = "none";
		document.getElementById("listOptions").style.height = "130px";
	}
	else {
		document.getElementById("renameList").style.display = "block";
		document.getElementById("deleteList").style.display = "block";
		document.getElementById("listOptions").style.height = "225px";
	}

}


function showfocus() {
	document.getElementById("add-new-list").focus();
}

function checkIfPopupIsOpen(event) {
	var element = document.getElementById("pop-up");
	if (element.style.display == "block"){
		element.style.display = "none";
	}
	var taskpopup = document.getElementById("pop-up-for-task");
	if (taskpopup.style.display == "block"){
		taskpopup.style.display = "none";
	}
	var id = event.target.id;
	if (id =="next" || id == "inputField" || id == "plus")
		showBlueLine();
	else {
		document.getElementById("blueLine").style.background = "transparent";
		var icon = document.getElementById("iconPlus");
		icon.classList.remove("fa-circle-thin");
		icon.classList.add("fa-plus");
	}
	if(event.target.id == "dot" || event.target.id == "iconDot") {
		document.getElementById("listOptions").style.display ="block";
	}
	else {
		document.getElementById("listOptions").style.display ="none";
	}
	
}

function storeExtraTasks(text,event) {
	if (text.value.trim().length == 0) {
		document.getElementById("addButton").style.display = "none";
	}
	else
		document.getElementById("addButton").style.display = "block";
	if(event.keyCode == 13) {
		if(text.value.trim() =="") {

		}
		else {
			var index = 0;
			var textOnPTag = document.getElementById("task-name").textContent;
			for (var i = 0;i < tasks.length; i++) {
				if (tasks[i].appearance == textOnPTag) {
					index = i ;
					break;
				}
			}
			var extraTask = document.getElementById("inputField").value ;
			var newTask = new Object();
			newTask.name = extraTask;
			newTask.id = "e" + new Date().valueOf();
			newTask.parent = textOnPTag;
			newTask.completed = false;
			if(textOnPTag == "Important")
				newTask.important = true;
			else
				newTask.important = false;
			tasks[index].extra.push(newTask) ; 
			document.getElementById("inputField").value = "";
			document.getElementById("addButton").style.display = "none";
			document.getElementById("blueLine").style.background = "blue";
			displayExtraTask();
		}
	}
}

function displayExtraTask() {
	var index = 0;
	var textOnPTag = document.getElementById("task-name").textContent;
	for (var i = 0;i < tasks.length; i++) {
		if (tasks[i].appearance == textOnPTag) {
			index = i ;
			break;
		}
	}
	var uncompleted = document.getElementById("taskLists");
	uncompleted.innerHTML = '';
	var completedTask = document.getElementById("CompletedTasks");
	completedTask.innerHTML = '';
	document.getElementById("CompletedHeader").style.display="none";
	for (var i = tasks[index].extra.length - 1 ; i >= 0 ; i--)
	{
		var li = document.createElement("li");
		var id = tasks[index].extra[i].id;
		li.setAttribute("id", id);
		var iconFirst = document.createElement("i");
		var idForIcon = "if" + id;
		iconFirst.setAttribute("id", idForIcon);
		var ptagMiddle = document.createElement("p");
		ptagMiddle.textContent = tasks[index].extra[i].name;
		var iconLast = document.createElement("i");
		iconLast.setAttribute("id", "is" + id);
		if(tasks[index].extra[i].completed == false) {
			
			iconFirst.classList.add("fa", "fa-circle-thin", "iconfirst");
			iconFirst.addEventListener("mouseenter", changeToTick);
			iconFirst.addEventListener("mouseleave", changeToCircle);
			iconFirst.setAttribute("title", "Mark as Completed");
			li.appendChild(iconFirst);
			li.appendChild(ptagMiddle);
			li.appendChild(iconLast);
			uncompleted.appendChild(li);
		}
		else {
			document.getElementById("CompletedHeader").style.display="block";
			iconFirst.classList.add("fa","fa-check-circle","iconfirst");
			iconFirst.setAttribute("title", "Mark as Not Completed");
			li.appendChild(iconFirst);
			li.appendChild(ptagMiddle);
			li.appendChild(iconLast);
			completedTask.appendChild(li);

		}
		if(tasks[index].extra[i].important == false) {
			iconLast.classList.add("fa", "fa-star-o", "iconlast");
			document.getElementById("is" + id).addEventListener('click', markAsImportant);
			iconLast.setAttribute("title", "Mark as Important");
		}
		else {
			iconLast.classList.add("fa", "fa-star", "iconlast", "icon-blue");
			document.getElementById("is" + id).addEventListener('click', removeImportant);
			iconLast.setAttribute("title", "Remove Importance");
		}
	}
}

function showBlueLine(event) {
	var icon = document.getElementById("iconPlus");
	icon.classList.remove("fa-plus");
	icon.classList.add("fa-circle-thin");
	document.getElementById("blueLine").style.background = "blue";
	document.getElementById("inputField").focus();
}

function changeToTick(e) {
	var element = document.getElementById(e.target.id);
	element.classList.remove("fa-circle-thin");
	element.classList.add("fa-check-circle-o");
	
}

function changeToCircle(e) {
	var element = document.getElementById(e.target.id);
	element.classList.remove("fa-check-circle-o");
	element.classList.add("fa-circle-thin");
}

function changeColor(event) {
	var themes = { blue:'#0099ff', red:'#ff6666', purple:'#993399', green:'#339933', skyblue:'#33ccff' };
	var id = event.target.id;
	var listID;
	var colour = themes[id];
	var content = document.getElementById("task-name").textContent;
	for ( var i = 0; i < tasks.length; i++) {
		if ( tasks[i].appearance == content) { 
			tasks[i].color = colour;
			listID = tasks[i].id;
		}
	}
	document.getElementById(listID).style.color = colour;
	document.getElementById("tasks-right-new").style.color = colour;
	document.getElementById(listID + "i").style.color = colour;
}

var taskId = 0;
var isextra = false;
function popUpForExtraTasks(event) {
	var button = event.buttons;
	if (button == 2) {
		if(event.target.id.startsWith("e")) {
			var xCoOrdinate = event.clientX;
			var yCoOrdinate = event.clientY;
			if(xCoOrdinate + 240 > 1300)
				xCoOrdinate = 1300 - 240;
			if(yCoOrdinate + 440 > 640)
				yCoOrdinate = 640 - 440;
			document.getElementById("taskLists").style.backgroundColor = "white";
			document.getElementById("CompletedTasks").style.backgroundColor = "white";
			document.getElementById(event.target.id).style.background = "var(--left-content)";
			var element = document.getElementById("extraTasksPopUp");
			element.style.display = "block";
			element.style.left = xCoOrdinate + 'px';
			element.style.top = yCoOrdinate + 'px';
			var content = document.getElementById("task-name").textContent;
			for ( var i = 0; i < tasks.length; i++) {
				if ( tasks[i].appearance == content) { 
					indexInTasks = i;
					break;
				}
			}

			var checkCompleted = false;
			var checkImportant = false;
			for(var i = 0; i < tasks[indexInTasks].extra.length; i++) {
				if(tasks[indexInTasks].extra[i].id == event.target.id) {
					nameOfTheTask = tasks[indexInTasks].extra[i].name;
					if(tasks[indexInTasks].extra[i].completed == true)
						checkCompleted = true;
					if(tasks[indexInTasks].extra[i].important == true)
						checkImportant = true;
					taskId = i;
					break;
				}
			}
			if(checkCompleted) {
				document.getElementById("markOption").classList.remove("fa-check-circle-o");
				document.getElementById("markOption").classList.add("fa-circle-thin");
				document.getElementById("mark-text").textContent = "Mark as Not Completed";
				document.getElementById("mark").addEventListener('click', removeFromCompleted);
			}
			if(!checkCompleted) {
				document.getElementById("markOption").classList.remove("fa-circle-thin");
				document.getElementById("markOption").classList.add("fa-check-circle-o");
				document.getElementById("mark-text").textContent = "Mark as Completed";
				document.getElementById("mark").addEventListener('click', addToCompleted);
			}
			if(checkImportant) {
				document.getElementById("important-icon").classList.remove("fa-star-o");
				document.getElementById("important-icon").classList.add("fa-star");
				document.getElementById("important-text").textContent = "Remove Importance";
				document.getElementById("mark-important").addEventListener('click', removeImportance);
			}
			if(!checkImportant) {
				document.getElementById("important-icon").classList.remove("fa-star");
				document.getElementById("important-icon").classList.add("fa-star-o");
				document.getElementById("important-text").textContent = "Mark as Important";
				document.getElementById("mark-important").addEventListener('click', addImportance);
			}
			isextra = true;
			displayExtraTask();
			document.getElementById(event.target.id).style.background = "#e6f2ff";
		}
	}
	
}

function deleteExtraTask() {

	var dialog = document.getElementById("confirmDelete");
	var main = document.getElementById("body-content");
	main.classList.add("blur");
	var customText = document.getElementById("custom-text");
	customText.textContent = "\"" + nameOfTheTask + "\"" + " will be permanently deleted";
	dialog.style.display = "block";
	document.getElementById("pop-up").style.display = "none";
	document.getElementById("listOptions").style.display = "none";
	document.getElementById("extraTasksPopUp").style.display = "none";
}

function addToCompletedList(event) {
	var eventId = event.target.id;
	if(eventId.startsWith("ife")) {
		let id = eventId.slice(2);
		var content = document.getElementById("task-name").textContent;
		for ( var i = 0; i < tasks.length; i++) {
			if ( tasks[i].appearance == content) { 
				indexInTasks = i;
				break;
			}
		}
		for(var i = 0; i < tasks[indexInTasks].extra.length; i++) {
			if(tasks[indexInTasks].extra[i].id == id) {
				tasks[indexInTasks].extra[i].completed = true;
				break;
			}
		}
		displayExtraTask();

	}

}

function removeFromCompletedList(event) {
	var eventId = event.target.id;
	if(eventId.startsWith("ife")) {
		let id = eventId.slice(2);
		var content = document.getElementById("task-name").textContent;
		for ( var i = 0; i < tasks.length; i++) {
			if ( tasks[i].appearance == content) { 
				indexInTasks = i;
				break;
			}
		}
		for(var i = 0; i < tasks[indexInTasks].extra.length; i++) {
			if(tasks[indexInTasks].extra[i].id == id) {
				tasks[indexInTasks].extra[i].completed = false;
				break;
			}
		}
		displayExtraTask();

	}

}

var hidden = false;
function showOrHideCompleted() {
	var listid = document.getElementById("CompletedTasks");
	if (!hidden) {
		listid.style.display = "none";
		document.getElementById("icon-angle").classList.remove("fa-angle-down");
		document.getElementById("icon-angle").classList.add("fa-angle-right");
		hidden = true;
	}
	else {
		listid.style.display = "block";
		document.getElementById("icon-angle").classList.remove("fa-angle-right");
		document.getElementById("icon-angle").classList.add("fa-angle-down");
		hidden = false;
	}
}

function addToCompleted() {
	tasks[indexInTasks].extra[taskId].completed = true;
	document.getElementById("extraTasksPopUp").style.display = "none";
	displayExtraTask();

}

function removeFromCompleted() {
	tasks[indexInTasks].extra[taskId].completed = false;
	document.getElementById("extraTasksPopUp").style.display = "none";
	displayExtraTask();

}

function markAsImportant(event) {
	var eventId = event.target.id;
	let id = eventId.slice(2);
	var content = document.getElementById("task-name").textContent;
	for ( var i = 0; i < tasks.length; i++) {
		if ( tasks[i].appearance == content) { 
			indexInTasks = i;
			break;
		}
	}
	let index = 0;
	for(var i = 0; i < tasks[indexInTasks].extra.length; i++) {
		if(tasks[indexInTasks].extra[i].id == id) {
			tasks[indexInTasks].extra[i].important = true;
			index = i;
			break;
		}
	}
	
	tasks[1].extra.push(tasks[indexInTasks].extra[index]);
	var change = tasks[indexInTasks].extra[index];
	tasks[indexInTasks].extra.splice(index,1);
	tasks[indexInTasks].extra.push(change);
	displayExtraTask();

}

function removeImportant(event) {
	var eventId = event.target.id;
	let id = eventId.slice(2);
	var content = document.getElementById("task-name").textContent;
	for ( var i = 0; i < tasks.length; i++) {
		if ( tasks[i].appearance == content) { 
			indexInTasks = i;
			break;
		}
	}
	for(var i = 0; i < tasks[indexInTasks].extra.length; i++) {
		if(tasks[indexInTasks].extra[i].id == id) {
			tasks[indexInTasks].extra[i].important = false;
			break;
		}
	}
	for(var i = 0; i < tasks[1].extra.length; i++) {
		if(tasks[1].extra[i].id == id) {
			tasks[1].extra.splice(i,1);
			break;
		}
	}

	displayExtraTask();

}

function removeImportance() {
	tasks[indexInTasks].extra[taskId].important = false;
	tasks[1].extra.splice(taskId, 1);
	displayExtraTask();
	document.getElementById("extraTasksPopUp").style.display = "none";
}

function addImportance() {
	tasks[indexInTasks].extra[taskId].important = true;
	tasks[1].extra.push(tasks[indexInTasks].extra[taskId]);
	var change = tasks[indexInTasks].extra[taskId];
	tasks[indexInTasks].extra.splice(taskId, 1);
	tasks[indexInTasks].extra.push(change);
	displayExtraTask();
	document.getElementById("extraTasksPopUp").style.display = "none";
}
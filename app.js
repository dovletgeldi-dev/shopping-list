"use strict";

const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");
const formBtn = document.querySelector("button");
let editMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));

  checkItems();
}

// Add item
function addItemOnSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  // Validate input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Check for editMode
  if (editMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    editMode = false;
  }

  // Create item to DOM element
  addItemToDom(newItem);

  // Add item to localStorage
  addItemToStorage(newItem);

  // Check UI
  checkItems();

  itemInput.value = "";
}

function addItemToDom(items) {
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(items));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to an array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(params) {
  let itemsFromStorage;

  // Checking to see if there any items in storage
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = []; //if isn't then set variable to an array
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items")); //if is then parse it into variable
  }

  return itemsFromStorage;
}

function OnClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  editMode = true;

  itemList.querySelectorAll("li").forEach((i) => {
    i.classList.remove("edit-mode");
  });

  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "green";
  itemInput.value = item.textContent;
}

// Remove Item
function removeItem(item) {
  if (confirm("Are you sure you want to delete?")) {
    // remove from DOM
    item.remove();

    // remove for localStorage
    removeItemFromStorage(item.textContent);
  }
  checkItems();
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // filter items to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // reset to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Clear All Items
function clearItems(e) {
  let confirmToDelete = confirm("Are you sure you want to clear all?");
  if (confirmToDelete === true) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }

  localStorage.removeItem("items");

  checkItems();
}

// Filter items
function filterItems(e) {
  const items = document.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Check UI
function checkItems() {
  itemInput.value = "";

  const items = document.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  formBtn.innerHTML = '<i class = "fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";

  editMode = false;
}

// Initialize
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", addItemOnSubmit);
  itemList.addEventListener("click", OnClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkItems();
}

init();

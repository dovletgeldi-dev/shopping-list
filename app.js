"use strict";

const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

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

  // Create item DOM element
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

// Remove Item
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure you want to delete")) {
      e.target.parentElement.parentElement.remove();
    }
    checkItems();
  }
}

// Clear All Items
function clearItems(e) {
  let confirmToDelete = confirm("Are you sure you want to clear all?");
  if (confirmToDelete === true) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
    checkItems();
  }
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
  const items = document.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Initialize
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", addItemOnSubmit);
  itemList.addEventListener("click", removeItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkItems();
}

init();

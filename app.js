"use strict";

const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

// Add item
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  // Validate input
  if (newItem.value === "") {
    alert("Please add an item");
    return;
  }

  // console.log(itemInput.value);

  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li
  itemList.appendChild(li);

  checkItems();

  itemInput.value = "";
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

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);

checkItems();

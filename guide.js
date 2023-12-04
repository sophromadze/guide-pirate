// Get all custom select elements
var customSelects = document.querySelectorAll(".custom-select");

// Get the first custom select element
var pirateLvlSelect = document.querySelector(".pirateLvl .custom-select");

// Get the select items element within the custom select element
var pirateLvlSelectItems = pirateLvlSelect.querySelector(".select-items");

// Create 6 select option elements and append them to the select items element
for (var i = 0; i <= 5; i++) {
  var option = document.createElement("div");
  option.classList.add("select-option");
  option.setAttribute("data-value", i);
  if (i === 0) {
    option.innerHTML = "SELECT";
  } else {
    option.textContent = i;
  }
  pirateLvlSelectItems.appendChild(option);
}
pirateLvlSelectItems.addEventListener("click", function (event) {
  const pirateLvl = parseInt(event.target.getAttribute("data-value"), 10);
  const rangeInput = document.querySelector(".rangeInput");

  // Get the current value of the range input before changing the level
  if (rangeInput.value !== "") {
    lastRangeValue = parseInt(rangeInput.value, 10);
  }

  // hideAllShipLvlSelects();
  // Hide or show ship level select elements based on the selected pirate level
  shipLvlSelects.forEach(function (shipLvlSelect, index) {
    // Assuming that index corresponds to the ship level - 1 (i.e., index 0 for level 1)
    if (index + 1 <= rangeInput.value) {
      shipLvlSelect.style.display = "block";
    } else {
      shipLvlSelect.style.display = "none";
    }
  });

  // Assuming that the maximum values for levels are fixed as provided in your original code
  const maxValues = { 1: 0, 2: 2, 3: 8, 4: 17, 5: 29 };
  const newMax = maxValues[pirateLvl] || 0; // Get the new max or default to 0 if pirateLvl is not in maxValues
  rangeInput.max = newMax;

  // Check if the current value is within the new range
  // If it's not, or the level is 1, set the input value to the new max
  if (lastRangeValue > newMax || pirateLvl === 1) {
    rangeInput.value = newMax;
  } else {
    // Otherwise, keep the last range value
    rangeInput.value = lastRangeValue;
  }
  updateShipLvlSelectVisibility(rangeInput.value); // Add this call to update visibility based on the new range value

  // Now reset the select elements that are hidden
  resetShipLvlSelects(rangeInput.value);
  // Update the range slider's visual properties
  const rangeSlider = document.querySelector(".range-slider");
  rangeSlider.style.setProperty("--max", newMax);
  rangeSlider.style.setProperty("--value", rangeInput.value);

  // Update the number input display accordingly
  const shipNumberInput = document.getElementById("shipNumberInput");
  if (pirateLvl === 1 || pirateLvl === 0) {
    shipNumberInput.value = "";
    shipNumberInput.placeholder = "YOUR PIRATE'S LEVEL IS BELOW 2";
  } else {
    shipNumberInput.placeholder = "";
    shipNumberInput.value = rangeInput.value;
  }

  // Enable or disable the range input based on the level
  setRangeInputEnabled(pirateLvl >= 2);

  // resetShipLvlSelects();
  updateTextElementVisibility();
  updateTreasureBoxes();
  X = sumShipLvl2Points();
});
// Points mapping
var pointsMapping = {
  0: 0,
  1: 60,
  2: 180,
  3: 540,
  4: 1080,
  5: 1800,
};

// Function to get points based on data-value
function getPointsFromDataValue(dataValue) {
  return pointsMapping[dataValue];
}

// Event listener for select-option click
pirateLvlSelectItems.addEventListener("click", function (event) {
  if (event.target.classList.contains("select-option")) {
    var selectedValue = event.target.getAttribute("data-value");
    var points = getPointsFromDataValue(selectedValue);
    // Update the selected value and points in the UI
    document.querySelector(".select-selected").innerHTML =
      event.target.textContent + ' <i class="fas fa-chevron-down"></i>';
    document.querySelector("input[name='select-value']").value = points;
  }
  resetHiddenShipLvl2Inputs();
  X = sumShipLvl2Points();
  // Update Y variable with the selected points
  Y = points;
  // console.log("Pirate Point: ", Y);
  updateDailyIncome();
  updateCustomSelectsState();
});

// Get the second custom select element
var shipLvlSelect = document.querySelector(".shipLvl .custom-select");

// Get the select items element within the custom select element
var shipLvlSelectItems = shipLvlSelect.querySelector(".select-items");

// Create 49 select option elements and append them to the select items element
for (var i = 0; i <= 49; i++) {
  var option = document.createElement("div");
  option.classList.add("select-option");
  option.setAttribute("data-value", i);
  if (i === 0) {
    option.innerHTML = "SELECT";
  } else {
    option.textContent = i;
  }
  shipLvlSelectItems.appendChild(option);
}

// Points mapping for shipLvl
var shipLvlPointsMapping = {
  0: [0, 1],
  1: [40, 53],
  2: [45, 52],
  3: [51, 51],
  4: [58, 50],
  5: [66, 49],
  6: [75, 48],
  7: [85, 47],
  8: [96, 46],
  9: [108, 45],
  10: [138, 54],
  11: [173, 53],
  12: [213, 52],
  13: [258, 51],
  14: [308, 50],
  15: [363, 49],
  16: [423, 48],
  17: [488, 47],
  18: [558, 46],
  19: [633, 45],
  20: [783, 54],
  21: [943, 53],
  22: [1113, 52],
  23: [1293, 51],
  24: [1483, 50],
  25: [1683, 49],
  26: [1893, 48],
  27: [2113, 47],
  28: [2343, 46],
  29: [2583, 45],
  30: [2983, 54],
  31: [3483, 53],
  32: [4083, 52],
  33: [4783, 51],
  34: [5583, 50],
  35: [6483, 49],
  36: [7483, 48],
  37: [8583, 47],
  38: [9783, 46],
  39: [11083, 45],
  40: [13083, 54],
  41: [15583, 53],
  42: [18583, 52],
  43: [22083, 51],
  44: [26083, 50],
  45: [30583, 49],
  46: [35583, 48],
  47: [41083, 47],
  48: [47083, 46],
  49: [53583, 45],
};

// Function to get points based on data-value for shipLvl
function getShipLvlPointsFromDataValue(dataValue) {
  return shipLvlPointsMapping[dataValue];
}

// Event listener for shipLvl select-option click
shipLvlSelectItems.addEventListener("click", function (event) {
  if (event.target.classList.contains("select-option")) {
    var selectedValue = event.target.getAttribute("data-value");
    var points = getShipLvlPointsFromDataValue(selectedValue);

    // Update the H and Z variables with the selected points
    H = points[0];
    Z = points[1];

    // Update the selected value and points in the UI
    document.querySelector(".shipLvl .select-selected").innerHTML =
      event.target.textContent + ' <i class="fas fa-chevron-down"></i>';
    document.querySelector(".shipLvl input[name='select-value']").value =
      points.join(", ");
    // console.log("Main ship point 1: ", H);
    // console.log("Main ship point 2: ", Z);
    updateDailyIncome();
  }
});

// Loop through each custom select element
customSelects.forEach(function (customSelect) {
  // Get the select elements within the custom select element
  var selectSelected = customSelect.querySelector(".select-selected");
  var selectItems = customSelect.querySelector(".select-items");
  var selectOptions = customSelect.querySelectorAll(".select-option");

  // Add click event listener to selectSelected element
  selectSelected.addEventListener("click", function () {
    // Check if any other custom select element has its select items visible
    customSelects.forEach(function (otherSelect) {
      if (otherSelect !== customSelect) {
        otherSelect
          .querySelector(".select-items.active")
          ?.classList.remove("active");
      }
    });

    // Toggle 'active' class to show/hide the options
    selectItems.classList.toggle("active");
  });

  // Loop through each selectOption element and add a click event listener
  for (var i = 0; i < selectOptions.length; i++) {
    selectOptions[i].addEventListener("click", function () {
      // Set the selectSelected element's text to the selected option's text
      selectSelected.textContent = this.textContent;
      // Set the hidden input element's value to the selected option's value
      customSelect.querySelector('input[name="select-value"]').value =
        this.getAttribute("data-value") || "0"; // Use an empty string if data-value is not set
      // Remove the 'active' class from the selectItems element to hide the options
      selectItems.classList.remove("active");
    });
  }
});

// Add click event listener to the document object
document.addEventListener("click", function (event) {
  // Get the target element of the click event
  var target = event.target;

  // Check if the click event occurred within a custom select element
  if (
    !target.closest(".custom-select") &&
    document.querySelector(".select-items.active")
  ) {
    // Hide the select items
    document.querySelector(".select-items.active").classList.remove("active");
  }
});

// range input value
function updateShipNumber(value) {
  document.getElementById("shipNumberInput").value = value;

  var shipLvl2Elements = document.querySelectorAll(".shipLvl2");

  shipLvl2Elements.forEach(function (shipLvl2, index) {
    var selectValueInput = shipLvl2.querySelector('input[name="select-value"]');
    if (index + 1 > value) {
      if (selectValueInput) {
        selectValueInput.value = "0"; // Reset the value
      }
    }
  });

  // Recalculate X
  X = sumShipLvl2Points();

  // Trigger the formula recalculation.
  updateDailyIncome();

  // Update the treasure boxes.
  updateTreasureBoxes();
}

// Get the container element for the custom selects
var container = document.querySelector("#container");

// Points mapping for shipLvl2
var shipLvl2PointsMapping = {
  0: 0,
  1: 40,
  2: 45,
  3: 51,
  4: 58,
  5: 66,
  6: 75,
  7: 85,
  8: 96,
  9: 108,
  10: 138,
  11: 173,
  12: 213,
  13: 258,
  14: 308,
  15: 363,
  16: 423,
  17: 488,
  18: 558,
  19: 633,
  20: 783,
  21: 943,
  22: 1113,
  23: 1293,
  24: 1483,
  25: 1683,
  26: 1893,
  27: 2113,
  28: 2343,
  29: 2583,
  30: 2983,
  31: 3483,
  32: 4083,
  33: 4783,
  34: 5583,
  35: 6483,
  36: 7483,
  37: 8583,
  38: 9783,
  39: 11083,
  40: 13083,
  41: 15583,
  42: 18583,
  43: 22083,
  44: 26083,
  45: 30583,
  46: 35583,
  47: 41083,
  48: 47083,
  49: 53583,
};

// Function to sum the points for all selected ship levels
function sumShipLvl2Points() {
  var shipLvl2Elements = document.querySelectorAll(".shipLvl2");
  var sum = 0;

  shipLvl2Elements.forEach(function (shipLvl2Element) {
    var selectedValue = shipLvl2Element.querySelector(
      "input[name='select-value']"
    ).value;
    if (selectedValue) {
      var dataValue = parseInt(selectedValue, 10);
      var points = getShipLvl2PointsFromDataValue(dataValue);
      sum += points;
    }
  });

  return sum;
}

// Function to get points based on data-value for shipLvl2
function getShipLvl2PointsFromDataValue(dataValue) {
  if (dataValue === undefined) {
    return 0;
  }
  return shipLvl2PointsMapping[dataValue];
}

// Event listener for shipLvl2 select-option click
function addShipLvl2SelectItemsEventListener(shipLvlSelectItems) {
  shipLvlSelectItems.addEventListener("click", function (event) {
    if (event.target.classList.contains("select-option")) {
      var shipLvl2Element = event.target.closest(".shipLvl2");
      if (shipLvl2Element) {
        var selectValueInput = shipLvl2Element.querySelector(
          'input[name="select-value"]'
        );
        if (selectValueInput) {
          selectValueInput.value = event.target.getAttribute("data-value");
          // Recalculate X
          X = sumShipLvl2Points();
          // console.log("Flot points:", X);
          // Trigger the formula recalculation.
          updateDailyIncome();
        }
      }
    }
  });
}

// Create 49 select option elements and append them to the select items element
function createShipLvl2SelectItems(shipLvlSelectItems) {
  for (var i = 0; i <= 49; i++) {
    var option = document.createElement("div");
    option.classList.add("select-option");
    option.setAttribute("data-value", i);
    if (i === 0) {
      option.innerHTML = "SELECT";
    } else {
      option.textContent = i;
    }
    shipLvlSelectItems.appendChild(option);
  }
}

let selectArr = [];

// axali funqcia yvela flotis gemze ertad zemoqmedebistvis

// Create the master select element (similar to individual ship level selects)
const masterSelect = document.createElement("div");
masterSelect.classList.add("shipLvlMaster");

// Add the label for this select element
const masterLabel = document.createElement("div");
masterLabel.classList.add("select-label");
masterLabel.textContent = "SET SAME LVL TO ALL SHIPS";
masterSelect.appendChild(masterLabel);

// Create the select element and its children for master control
const masterSelectContainer = document.createElement("div");
masterSelectContainer.classList.add("custom-select");

const masterSelectSelected = document.createElement("div");
masterSelectSelected.classList.add("select-selected");
masterSelectSelected.innerHTML = "SELECT <i class='fas fa-chevron-down'></i>";

const masterSelectItems = document.createElement("div");
masterSelectItems.classList.add("select-items");

// Create the hidden input for master select to hold the value
const masterSelectValue = document.createElement("input");
masterSelectValue.setAttribute("type", "hidden");
masterSelectValue.setAttribute("name", "master-select-value");

// Append the children to the master select container
masterSelectContainer.appendChild(masterSelectSelected);
masterSelectContainer.appendChild(masterSelectItems);
masterSelectContainer.appendChild(masterSelectValue);

// Append the master select container to the masterSelect
masterSelect.appendChild(masterSelectContainer);

// Function to populate the master select options, it should be defined somewhere in your code
// This should create elements with class 'select-option' and an attribute 'data-value'
createShipLvl2SelectItems(masterSelectItems); // Assuming this function creates option elements

// Append the master select element to the container
container.appendChild(masterSelect);

// Assume that masterSelectItems is the container for your option elements
// Click event listener for each master select option
masterSelectItems.querySelectorAll(".select-option").forEach((selectOption) => {
  selectOption.addEventListener("click", function () {
    const value = this.getAttribute("data-value");

    // Set the selected value on the master select and close the dropdown
    updateSelectSelected(masterSelectSelected, value);
    masterSelectValue.value = value;
    masterSelectItems.classList.remove("active");

    // Update all other ship level selects
    updateAllShipLvl2Selects(value);

    // After all updates, call the functions to update daily income and treasure boxes
    updateDailyIncome();
    updateTreasureBoxes();
  });
});

function updateSelectSelected(selectSelectedElement, value) {
  if (value === "0") {
    selectSelectedElement.innerHTML =
      "SELECT <i class='fas fa-chevron-down'></i>";
  } else {
    selectSelectedElement.textContent = value; // This sets the text only, without HTML
    selectSelectedElement.innerHTML += " <i class='fas fa-chevron-down'></i>"; // This appends the HTML
  }
}

// Click event listener for master select to toggle dropdown
masterSelectSelected.addEventListener("click", function () {
  this.nextSibling.classList.toggle("active");
});

function updateAllShipLvl2Selects(newValue) {
  const shipLvlSelects = document.querySelectorAll(
    ".shipLvl2 .select-selected"
  );
  let lastVisibleIndex = -1; // Store the index of the last visible .shipLvl2 element

  shipLvlSelects.forEach((select, index) => {
    const shipLvl2Element = select.closest(".shipLvl2");
    const style = window.getComputedStyle(shipLvl2Element);
    const hiddenInput = select.nextElementSibling.nextElementSibling;

    // If the element is not displayed, don't update its value, skip to the next
    if (style.display === "none") {
      if (newValue === "0") {
        // Ensure that hidden elements are reset to default state
        hiddenInput.value = "0";
        select.innerHTML = "SELECT <i class='fas fa-chevron-down'></i>";
        shipLvl2Element.style.opacity = "0.5";
        shipLvl2Element.style.pointerEvents = "none";
      }
      return; // Continue to next iteration
    }

    // Update the value of visible elements
    hiddenInput.value = newValue;
    if (newValue === "0") {
      select.innerHTML = "SELECT <i class='fas fa-chevron-down'></i>";
      if (index !== 0) {
        shipLvl2Element.style.opacity = "0.5";
        shipLvl2Element.style.pointerEvents = "none";
      }
    } else {
      select.textContent = newValue;
      select.innerHTML += " <i class='fas fa-chevron-down'></i>";
      shipLvl2Element.style.opacity = "";
      shipLvl2Element.style.pointerEvents = "";
    }

    lastVisibleIndex = index; // Update the last visible index
  });

  // If there's at least one visible element and newValue is not "0", update the next sibling of the last visible element
  if (lastVisibleIndex !== -1 && newValue !== "0") {
    const lastVisibleElement =
      shipLvlSelects[lastVisibleIndex].closest(".shipLvl2");
    const nextSibling = lastVisibleElement.nextElementSibling;
    if (
      nextSibling &&
      window.getComputedStyle(nextSibling).display === "none"
    ) {
      nextSibling.style.opacity = ""; // Reset the opacity to default
      nextSibling.style.pointerEvents = ""; // Reset the pointer events to default
    }
  }

  // After updating the values, recalculate X and update the UI accordingly
  X = sumShipLvl2Points();
  // console.log("axali racxa", X);
  updateDailyIncome();
  updateTreasureBoxes();
  updateCustomSelectsState();
}

// Helper flag to keep track if we have processed an additional hidden element
let additionalHiddenProcessed = false;

// aq vamtavreb

// Loop to create 29 custom select elements
for (var j = 2; j <= 31; j++) {
  // Create the custom select element
  const customSelect = document.createElement("div");
  customSelect.classList.add("shipLvl2");

  // Add the 'ship' class with the current value of j
  customSelect.classList.add("ship" + j);

  // Add the label for this select element
  const label = document.createElement("div");
  label.classList.add("select-label");
  label.textContent = "LVL OF SHIP " + j;
  customSelect.appendChild(label);

  // Create the select element and its children
  const select = document.createElement("div");
  select.classList.add("custom-select");
  const selectSelected = document.createElement("div");
  selectSelected.classList.add("select-selected");
  selectSelected.innerHTML = "SELECT <i class='fas fa-chevron-down'></i>";
  const selectItems = document.createElement("div");
  selectItems.classList.add("select-items");
  const selectValue = document.createElement("input");
  selectValue.setAttribute("type", "hidden");
  selectValue.setAttribute("name", "select-value");
  select.appendChild(selectSelected);
  select.appendChild(selectItems);
  select.appendChild(selectValue);

  // Create 49 select option elements and append them to the select items element
  createShipLvl2SelectItems(selectItems);

  // Add event listener for shipLvl2 select-option click
  addShipLvl2SelectItemsEventListener(selectItems);

  // Append the select element to the custom select element
  customSelect.appendChild(select);

  // Add click event listener to the select element
  selectSelected.addEventListener("click", function (e) {
    // Prevents the event from bubbling up to the document
    e.stopPropagation();

    // Close all other dropdowns except the current one
    const otherSelectItems = document.querySelectorAll(".select-items.active");
    otherSelectItems.forEach(
      function (otherSelectItem) {
        if (otherSelectItem !== this.nextElementSibling) {
          otherSelectItem.classList.remove("active");
        }
      }.bind(this)
    ); // The bind(this) is important to make sure 'this' refers to selectSelected inside the function

    // Toggle 'active' class to show/hide the options
    var selectItems = this.nextElementSibling;
    selectItems.classList.toggle("active");
  });

  // Event listener to close all select elements when clicking outside them
  document.addEventListener("click", function (e) {
    // Check if the click is not on one of the custom selects or any of its descendants
    if (!e.target.closest(".custom-select")) {
      // If it's outside, close all dropdowns
      const allActiveSelectItems = document.querySelectorAll(
        ".select-items.active"
      );
      allActiveSelectItems.forEach(function (activeSelectItem) {
        activeSelectItem.classList.remove("active");
      });
    }
  });

  // Loop through each selectOption element and add a click event listener
  var selectOptions = selectItems.querySelectorAll(".select-option");
  for (var i = 0; i < selectOptions.length; i++) {
    selectOptions[i].addEventListener("click", function () {
      // Set the selectSelected element's text to the selected option's text
      var value = this.getAttribute("data-value");
      var selectSelected =
        this.parentNode.parentNode.querySelector(".select-selected");
      if (value === "0") {
        selectSelected.innerHTML = "SELECT <i class='fas fa-chevron-down'></i>";
      } else {
        selectSelected.textContent = value;
        selectSelected.innerHTML += " <i class='fas fa-chevron-down'></i>";
      }
      // Set the hidden input element's value to the selected option's value
      var selectValue = this.parentNode.parentNode.querySelector(
        'input[name="select-value"]'
      );
      selectValue.value = value;
      // Remove the 'active' class from the selectItems element to hide the options
      var selectItems = this.parentNode;
      selectItems.classList.remove("active");

      // Update the state of the custom select elements
      updateCustomSelectsState();

      // If the data-value is 0, reset the next select elements
      if (value === "0") {
        // Reset the value of the next select elements if the current value is changed
        var nextCustomSelect =
          this.parentNode.parentNode.parentNode.nextElementSibling;
        while (
          nextCustomSelect &&
          nextCustomSelect.classList.contains("shipLvl2")
        ) {
          var nextSelectSelected =
            nextCustomSelect.querySelector(".select-selected");
          nextSelectSelected.innerHTML =
            "SELECT <i class='fas fa-chevron-down'></i>";
          var nextSelectValue = nextCustomSelect.querySelector(
            'input[name="select-value"]'
          );
          nextSelectValue.value = "";
          nextCustomSelect = nextCustomSelect.nextElementSibling;
        }
      }
    });
  }

  // Append the custom select element to the container
  container.appendChild(customSelect);
}

// Function to check the display style of .ship3 and hide .shipLvlMaster accordingly
function checkShip3AndToggleMasterVisibility() {
  const ship3 = document.querySelector(".ship3");
  const shipLvlMaster = document.querySelector(".shipLvlMaster");
  const masterSelectSelected = document.querySelector(
    ".shipLvlMaster .select-selected"
  );
  const masterSelectValue = document.querySelector(
    'input[name="master-select-value"]'
  );

  // Ensure the elements exist
  if (ship3 && shipLvlMaster) {
    const style = window.getComputedStyle(ship3);
    // If .ship3 is not displayed, hide .shipLvlMaster and reset its value
    if (style.display === "none") {
      shipLvlMaster.style.display = "none";
      resetMasterSelect(masterSelectSelected, masterSelectValue);
    } else {
      // Else, show .shipLvlMaster (or apply any other required style)
      shipLvlMaster.style.display = ""; // or 'block'/'flex' depending on your layout
    }
  }
}

document
  .querySelectorAll(".shipLvl2 .select-items .select-option")
  .forEach((option, index) => {
    option.addEventListener("click", function () {
      const selectedValue = this.getAttribute("data-value");
      const masterSelectValueElement = document.querySelector(
        'input[name="master-select-value"]'
      );
      const masterValue = masterSelectValueElement.value;
      const currentSelectValueElement = this.closest(
        ".custom-select"
      ).querySelector('input[name="select-value"]');
      const currentValue = currentSelectValueElement.value;

      // Condition 4: Check if the selected value is the same as the master and the current value is 0
      if (selectedValue === masterValue && currentValue === "0") {
        // Don't reset the master select
        return;
      }

      // Condition 2: If the first shipLvl2 element's value is set to 0, then reset the master
      if (index === 0 && selectedValue === "0") {
        resetMasterSelect(masterSelectValueElement, true);
      }

      // Condition 3: If any shipLvl2 element has a non-zero value different from the master's, then reset the master
      if (selectedValue !== masterValue && selectedValue !== "0") {
        resetMasterSelect(masterSelectValueElement, true);
      }
    });
  });

function resetMasterSelect(selectValueElement, setToZero) {
  const masterSelectSelected = document.querySelector(
    ".shipLvlMaster .select-selected"
  );

  if (setToZero) {
    selectValueElement.value = "0";
    masterSelectSelected.innerHTML =
      "SELECT <i class='fas fa-chevron-down'></i>";
  }
}

// Initial check when the script loads
checkShip3AndToggleMasterVisibility();

// Function to observe changes and toggle visibility of .shipLvlMaster
function observeChanges() {
  const ship3 = document.querySelector(".ship3");
  const shipLvlMaster = document.querySelector(".shipLvlMaster");
  if (!ship3 || !shipLvlMaster) return;

  // Create an observer instance
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "style") {
        checkShip3AndToggleMasterVisibility();
      }
    });
  });

  // Observe the .ship3 for changes in the 'style' attribute
  observer.observe(ship3, {
    attributes: true,
    attributeFilter: ["style"],
  });
}

// Call observeChanges to set up the observer
observeChanges();

// Add event listener for shipLvl2 select-option click
addShipLvl2SelectItemsEventListener(shipLvlSelectItems);

function resetHiddenShipLvl2Inputs() {
  var rangeInput = document.querySelector(".rangeInput");
  var maxAllowedValue = parseInt(rangeInput.value, 10); // Get the max allowed value from your range input

  // Loop through all shipLvl2 elements
  var shipLvl2Elements = document.querySelectorAll(".shipLvl2");
  shipLvl2Elements.forEach(function (shipLvl2Element, index) {
    // If the shipLvl2 element is beyond the max allowed value and thus will be hidden
    if (index >= maxAllowedValue) {
      // Reset the input value to 0
      var input = shipLvl2Element.querySelector('input[name="select-value"]');
      if (input) {
        input.value = "0";
      }

      // Update the display to show "SELECT"
      var selectSelected = shipLvl2Element.querySelector(".select-selected");
      if (selectSelected) {
        selectSelected.innerHTML = "SELECT <i class='fas fa-chevron-down'></i>";
      }
    }
  });
}

// aqedan
// Variable to keep track of the last range value before the level changes
let lastRangeValue = 0;

// aqamde

// Get all ship level custom select elements
var shipLvlSelects = document.querySelectorAll(".shipLvl2");

// Hide all ship level custom select elements by default
shipLvlSelects.forEach(function (shipLvlSelect) {
  shipLvlSelect.style.display = "none";
});

// If there are any ship level custom select elements, show the first one
if (shipLvlSelects.length > 0) {
  shipLvlSelects[0].style.display = "block";
}

var textElement = document.querySelector(".text");
var shipLvlSelectSelected = document.querySelector(".shipLvl .select-selected");
var rangeInput2 = document.querySelector(".rangeInput2");
rangeInput2.addEventListener("input", function (event) {
  updateTextElementVisibility();
});
// Add event listener for the range input element
var rangeInput = document.querySelector(".rangeInput");
rangeInput.addEventListener("input", function (event) {
  // Get the current value of the range input element
  var value = parseInt(event.target.value, 10);

  // Loop through each ship level custom select element
  shipLvlSelects.forEach(function (shipLvlSelect, index) {
    const selectSelected = shipLvlSelect.querySelector(".select-selected");
    // If the index is less than the range input value, show the element
    if (index < value) {
      shipLvlSelect.style.display = "block";
    }
    // Otherwise, hide the element and reset the .select-selected div
    else {
      shipLvlSelect.style.display = "none";
      selectSelected.innerHTML = "SELECT <i class='fas fa-chevron-down'></i>";
    }
  });

  updateCustomSelectsState(); // Update the state of the custom select elements
});

// Add event listener for the range input element

function setRangeInputEnabled(enabled) {
  const rangeInput = document.querySelector(".rangeInput");
  const rangeSlider = document.querySelector(".range-slider");
  if (enabled) {
    rangeInput.removeAttribute("disabled");
    rangeSlider.classList.remove("disabled");
  } else {
    rangeInput.setAttribute("disabled", "disabled");
    rangeSlider.classList.add("disabled");
  }
}

setRangeInputEnabled(false);

if (shipLvlSelects.length > 0) {
  shipLvlSelects[0].style.display = "none";
}

// function hideAllShipLvlSelects() {
//   shipLvlSelects.forEach(function (shipLvlSelect) {
//     shipLvlSelect.style.display = "none";
//   });
// }

function updateShipLvlSelectVisibility(maxAllowedValue) {
  shipLvlSelects.forEach(function (shipLvlSelect, index) {
    if (index + 1 <= maxAllowedValue) {
      shipLvlSelect.style.display = "block";
    } else {
      shipLvlSelect.style.display = "none";
    }
  });
}

function resetShipLvlSelects(maxAllowedValue) {
  // Get all .shipLvl2 .select-selected elements
  var shipLvlSelectSelecteds = document.querySelectorAll(
    ".shipLvl2 .select-selected"
  );

  shipLvlSelectSelecteds.forEach(function (shipLvlSelectSelected, index) {
    // Only reset selects that are beyond the maxAllowedValue
    if (index >= maxAllowedValue) {
      shipLvlSelectSelected.innerHTML =
        "SELECT <i class='fas fa-chevron-down'></i>";
      // Also reset the corresponding hidden input for this select
      var hiddenInput = shipLvlSelectSelected.nextElementSibling.querySelector(
        'input[name="select-value"]'
      );
      if (hiddenInput) {
        hiddenInput.value = "";
      }
    }
  });
}

// Get the select items element within the shipLvl custom select element
var shipLvlSelectItems = document.querySelector(".shipLvl .select-items");

// Add event listener for the shipLvlSelectItems click event
shipLvlSelectItems.addEventListener("click", function () {
  // Update the visibility of the .text element
  updateTextElementVisibility();
});
// Add event listener for the pirateLvlSelectItems click event
pirateLvlSelectItems.addEventListener("click", function () {
  // Update the visibility of the .text element
  updateTextElementVisibility();
});

function updateTextElementVisibility() {
  // Get the current value of the range input element
  var rangeValue = parseInt(rangeInput2.value, 10);

  // Get the current value of the shipLvl .select-selected element
  var shipLvlValue = parseInt(
    document.querySelector(".shipLvl input[name='select-value']").value,
    10
  );

  // Get the current value of the pirateLvl .select-selected element
  var pirateLvlValue = parseInt(
    document.querySelector(".pirateLvl input[name='select-value']").value,
    10
  );

  // Show or hide the .text element based on the conditions
  if (rangeValue > 0 && shipLvlValue > 0 && pirateLvlValue > 0) {
    textElement.style.display = "none";
  } else {
    textElement.style.display = "block";
  }
}

function limitInputValue(inputField) {
  let inputValue = parseInt(inputField.value);

  if (isNaN(inputValue) || inputValue < 0) {
    inputField.value = 0;
  } else if (inputValue > 100) {
    inputField.value = 100;
  } else {
    inputField.value = inputValue; // Removes leading zeros and fractional parts
  }
}

function calculatePercentage(value, percentage) {
  return (value * percentage) / 100;
}

function updateRangeSlider(value) {
  document.querySelector(".range-slider2 input[type='range']").value = value;
  document.querySelector(".range-slider2").style.setProperty("--value", value);

  var percentage = 1; // Change this value to the desired percentage
  D = calculatePercentage(value, percentage);
  updateDailyIncome();
}

function updateShipNumber2(value) {
  document.querySelector("#shipNumberInput2").value = value;

  var percentage = 1; // Change this value to the desired percentage
  D = calculatePercentage(value, percentage);
  // console.log("Durability:", D);
  updateDailyIncome();
}

function updateCustomSelectsState() {
  let previousSelected = true;

  shipLvlSelects.forEach(function (shipLvlSelect, index) {
    const selectSelected = shipLvlSelect.querySelector(".select-selected");
    const value = selectSelected.textContent.trim();

    if (previousSelected) {
      if (value !== "SELECT") {
        previousSelected = true;
      } else {
        previousSelected = false;
      }
      shipLvlSelect.style.pointerEvents = "";
      shipLvlSelect.style.opacity = "";
      enableSelect(shipLvlSelect); // Enable the select element
    } else {
      shipLvlSelect.style.pointerEvents = "none";
      shipLvlSelect.style.opacity = "0.5";
      disableSelect(shipLvlSelect); // Disable the select element
    }
  });

  let shipLvlDataValue = false;

  const shipLvlSelect = document.querySelector(".shipLvl .select-selected");
  const shipLvlValue = shipLvlSelect.textContent.trim();

  if (
    shipLvlValue === "9" ||
    shipLvlValue === "19" ||
    shipLvlValue === "29" ||
    shipLvlValue === "39" ||
    shipLvlValue === "49"
  ) {
    shipLvlDataValue = true;
  }

  // Assuming your .ship3, .ship9, .ship18, and .ship30 selectors are similarly structured to .ship4
  const shipLevelValue = (shipSelector) => {
    const hiddenInput = document.querySelector(
      shipSelector + ' input[name="select-value"]'
    );
    return hiddenInput ? parseInt(hiddenInput.value, 10) : 0;
  };

  // Add or remove .active class based on ship level values
  const updateActiveClasses = (
    shipSelector,
    rbStartSelector,
    rbStartH6Selector
  ) => {
    const shipValue = shipLevelValue(shipSelector);
    const rbStart = document.querySelector(rbStartSelector);
    const rbStartH6 = document.querySelector(rbStartH6Selector);

    // Since shipLvlDataValue is dependent on shipLvlValue, we need to check this condition inside this function
    const shipLvlSelect = document.querySelector(".shipLvl .select-selected");
    const shipLvlValue = shipLvlSelect.textContent.trim();
    let shipLvlDataValue = ["9", "19", "29", "39", "49"].includes(shipLvlValue);

    if (shipValue > 0 && shipLvlDataValue) {
      rbStart.classList.add("active");
      rbStartH6.classList.add("active");
    } else {
      rbStart.classList.remove("active");
      rbStartH6.classList.remove("active");
    }
  };

  // Now call updateActiveClasses for each ship level where required
  updateActiveClasses(".shipLvl2.ship3", ".hydra .rbStart", ".hydra h6");
  updateActiveClasses(".shipLvl2.ship9", ".calipso .rbStart", ".calipso h6");
  updateActiveClasses(".shipLvl2.ship18", ".kraken .rbStart", ".kraken h6");
  updateActiveClasses(".shipLvl2.ship30", ".poseidon .rbStart", ".poseidon h6");
}

// Function to disable a custom select
function disableSelect(customSelect) {
  const selectSelected = customSelect.querySelector(".select-selected");
  selectSelected.classList.add("disabled");
}

// Function to enable a custom select
function enableSelect(customSelect) {
  const selectSelected = customSelect.querySelector(".select-selected");
  selectSelected.classList.remove("disabled");
}

// Initialize the state of the custom select elements
// updateCustomSelectsState();

// Add click event listener to the .shipLvl .select-option elements
const shipLvlSelectOptions = document.querySelectorAll(
  ".shipLvl .select-option"
);
shipLvlSelectOptions.forEach(function (option) {
  option.addEventListener("click", function () {
    // Update the state of the custom select elements
    updateCustomSelectsState();
  });
});

// ---------------------------------

// raidbosebi

document.addEventListener("DOMContentLoaded", function () {
  // Get dropdown elements
  const pirateLvlDropdown = document.querySelector(".pirateLvl .select-items");
  const shipLvlDropdown = document.querySelector(".shipLvl .select-items");

  // Get the elements to add the active class to
  const royalShipRBStart = document.querySelector(
    ".raidBosses .royalShip .rbStart"
  );
  const royalShipH6 = document.querySelector(".raidBosses .royalShip h6");

  // Function to check the selected values and add the active class if conditions are met
  const checkValuesAndUpdate = () => {
    const pirateLvl = parseInt(
      document.querySelector(".pirateLvl .select-selected").textContent,
      10
    );
    const shipLvl = parseInt(
      document.querySelector(".shipLvl .select-selected").textContent,
      10
    );

    if (
      (pirateLvl >= 1 && shipLvl === 9) ||
      (pirateLvl >= 1 && shipLvl === 19) ||
      (pirateLvl >= 1 && shipLvl === 29) ||
      (pirateLvl >= 1 && shipLvl === 39) ||
      (pirateLvl >= 1 && shipLvl === 49)
    ) {
      royalShipRBStart.classList.add("active");
      royalShipH6.classList.add("active");
    } else {
      royalShipRBStart.classList.remove("active");
      royalShipH6.classList.remove("active");
    }
  };

  // Add click event listeners to each dropdown item
  const pirateLvlItems =
    pirateLvlDropdown.querySelectorAll(".select-items div");
  const shipLvlItems = shipLvlDropdown.querySelectorAll(".select-items div");

  pirateLvlItems.forEach((item) => {
    item.addEventListener("click", checkValuesAndUpdate);
  });

  shipLvlItems.forEach((item) => {
    item.addEventListener("click", checkValuesAndUpdate);
  });
});

document.querySelectorAll(".shipLvl .select-option").forEach((option) => {
  option.addEventListener("click", () => {
    const dataValue = parseInt(option.getAttribute("data-value"));
    const rbStartElements = document.querySelectorAll(".rbStart");
    const rbLevels = document.querySelector(".rbLevels");

    rbStartElements.forEach((rbStart) => {
      if (dataValue >= 10 && dataValue <= 19) {
        rbStart.style.background =
          "linear-gradient(180deg, #53F2B9 0%, #0C633E 100%)";
        rbStart.style.border = "0.5px solid #00FFA3";
        rbStart.style.boxShadow =
          "0px 4px 6px #144B44, inset 0px 4px 4px #49FFC5";
        rbStart.style.borderRadius = "8px";
        rbLevels.innerHTML = "LVL 2";
      } else if (dataValue >= 20 && dataValue <= 29) {
        rbStart.style.background =
          "linear-gradient(180deg, rgba(49, 131, 255, 0.7) 0%, rgba(11, 30, 67, 0.7) 100%)";
        rbStart.style.border = "0.5px solid #599CFF";
        rbStart.style.boxShadow =
          "0px 4px 6px #144B44, inset 0px 4px 6px #3D91F0";
        rbStart.style.borderRadius = "8px";
        rbLevels.innerHTML = "LVL 3";
      } else if (dataValue >= 30 && dataValue <= 39) {
        rbStart.style.background =
          "linear-gradient(180deg, rgba(161, 67, 255, 0.5) 0%, rgba(30, 0, 94, 0.5) 100%)";
        rbStart.style.border = "0.5px solid #A091FF";
        rbStart.style.boxShadow =
          "0px 4px 6px #144B44, inset 0px 4px 6px #7F59FF";
        rbStart.style.borderRadius = "8px";
        rbLevels.innerHTML = "LVL 4";
      } else if (dataValue >= 40 && dataValue <= 49) {
        rbStart.style.background =
          "linear-gradient(180deg, rgba(255, 218, 22, 0.7) 0%, rgba(255, 138, 0, 0.7) 0.01%, rgba(197, 94, 0, 0.7) 100%)";
        rbStart.style.border = "0.5px solid #FFB800";
        rbStart.style.boxShadow =
          "0px 4px 6px #144B44, inset 0px 4px 6px #FFB14A";
        rbStart.style.borderRadius = "8px";
        rbLevels.innerHTML = "LVL 5";
      } else {
        rbStart.style.background =
          "linear-gradient(180deg, rgba(225, 225, 225, 0.7) 0%, rgba(141, 141, 141, 0.56) 77.08%, rgba(66, 66, 66, 0.7) 100%)";
        rbStart.style.border = "0.5px solid #bebebe";
        rbStart.style.boxShadow =
          "0px 4px 6px #144b44, inset 0px 4px 5px #c1c1c1";
        rbStart.style.borderRadius = "8px";
        rbLevels.innerHTML = "LVL 1";
      }
    });
  });
});

var H = 0;
var Y = 0;
var Z = 1;
var X = 0;
var D = 1;

function updateDailyIncome() {
  if (Y === 0 || H === 0) {
    document.getElementById("dailyIncome").value = "0.00 PPT";
    document.getElementById("shipFixcingPrice").value = "0.00 PPT";
  } else {
    let dailyIncomeInput = ((Y + H + X) / Z) * D;
    // console.log(
    //   "pirate points:",
    //   Y,
    //   "main ship first points:",
    //   H,
    //   "main ship second points:",
    //   Z,
    //   "flotis pointebis jami:",
    //   X,
    //   "durability:",
    //   D
    // );
    document.getElementById("dailyIncome").value =
      dailyIncomeInput.toFixed(2) + " PPT";

    // Calculate 10% of the dailyIncomeInput
    let shipFixingPrice = dailyIncomeInput * 0.1;
    document.getElementById("shipFixcingPrice").value =
      shipFixingPrice.toFixed(2) + " PPT";
  }
}

//  treasure boxes
function getComputedStyleValue(element, property) {
  return window.getComputedStyle(element).getPropertyValue(property);
}

function updateTreasureBoxText(value) {
  const treasureBoxText = document.querySelector(".treasureBoxes h6");
  if (value === "COMMON") {
    treasureBoxText.textContent = "TREASURE BOXES (COMMON)";
  } else if (value === "UNCOMMON") {
    treasureBoxText.textContent = "TREASURE BOXES (UNCOMMON)";
  } else if (value === "RARE") {
    treasureBoxText.textContent = "TREASURE BOXES (RARE)";
  } else if (value === "EPIC") {
    treasureBoxText.textContent = "TREASURE BOXES (EPIC)";
  } else if (value === "LEGENDARY") {
    treasureBoxText.textContent = "TREASURE BOXES (LEGENDARY)";
  } else {
    treasureBoxText.textContent = "TREASURE BOXES";
  }
}

function updateTreasureBoxes() {
  const pirateLvl = document.querySelector(
    '.pirateLvl input[name="select-value"]'
  ).value;
  const shipLvl = document.querySelector(
    '.shipLvl input[name="select-value"]'
  ).value;
  const durability = document.querySelector(".rangeInput2").value;

  // Check if either pirateLvl or shipLvl is 0
  if (pirateLvl == 0 || shipLvl == 0 || durability == 0) {
    updateTreasureBoxText("");
    document.getElementById("treasureBoxes").value = 0;
    return;
  }
  const ship4Opacity = getComputedStyleValue(
    document.querySelector("#container .ship4"),
    "opacity"
  );
  const ship10Opacity = getComputedStyleValue(
    document.querySelector("#container .ship10"),
    "opacity"
  );
  const ship19Opacity = getComputedStyleValue(
    document.querySelector("#container .ship19"),
    "opacity"
  );
  const ship31Opacity = getComputedStyleValue(
    document.querySelector("#container .ship31"),
    "opacity"
  );
  const ship4display = getComputedStyleValue(
    document.querySelector("#container .ship3"),
    "display"
  );
  const ship10display = getComputedStyleValue(
    document.querySelector("#container .ship9"),
    "display"
  );
  const ship19display = getComputedStyleValue(
    document.querySelector("#container .ship18"),
    "display"
  );
  const ship31display = getComputedStyleValue(
    document.querySelector("#container .ship30"),
    "display"
  );

  let treasureBoxesValue = 0;

  if (shipLvl >= 1 && shipLvl <= 9) {
    treasureBoxesValue = 10;
    updateTreasureBoxText("COMMON");

    if (ship4Opacity > 0.5 && ship4display != "none") {
      treasureBoxesValue = 20;
    }
    if (ship10Opacity > 0.5 && ship10display != "none") {
      treasureBoxesValue = 45;
    }
    if (ship19Opacity > 0.5 && ship19display != "none") {
      treasureBoxesValue = 70;
    }
    if (ship31Opacity > 0.5 && ship31display != "none") {
      treasureBoxesValue = 100;
    }
  } else if (pirateLvl >= 1 && shipLvl >= 10 && shipLvl <= 19) {
    treasureBoxesValue = 15;
    updateTreasureBoxText("UNCOMMON");

    if (ship4Opacity > 0.5 && ship4display != "none") {
      treasureBoxesValue = 25;
    }
    if (ship10Opacity > 0.5 && ship10display != "none") {
      treasureBoxesValue = 50;
    }
    if (ship19Opacity > 0.5 && ship19display != "none") {
      treasureBoxesValue = 75;
    }
    if (ship31Opacity > 0.5 && ship31display != "none") {
      treasureBoxesValue = 105;
    }
  } else if (pirateLvl >= 1 && shipLvl >= 20 && shipLvl <= 29) {
    treasureBoxesValue = 20;
    updateTreasureBoxText("RARE");

    if (ship4Opacity > 0.5 && ship4display != "none") {
      treasureBoxesValue = 30;
    }
    if (ship10Opacity > 0.5 && ship10display != "none") {
      treasureBoxesValue = 55;
    }
    if (ship19Opacity > 0.5 && ship19display != "none") {
      treasureBoxesValue = 80;
    }
    if (ship31Opacity > 0.5 && ship31display != "none") {
      treasureBoxesValue = 110;
    }
  } else if (pirateLvl >= 1 && shipLvl >= 30 && shipLvl <= 39) {
    treasureBoxesValue = 25;
    updateTreasureBoxText("EPIC");

    if (ship4Opacity > 0.5 && ship4display != "none") {
      treasureBoxesValue = 35;
    }
    if (ship10Opacity > 0.5 && ship10display != "none") {
      treasureBoxesValue = 60;
    }
    if (ship19Opacity > 0.5 && ship19display != "none") {
      treasureBoxesValue = 85;
    }
    if (ship31Opacity > 0.5 && ship31display != "none") {
      treasureBoxesValue = 115;
    }
  } else if (pirateLvl >= 1 && shipLvl >= 40 && shipLvl <= 49) {
    treasureBoxesValue = 30;
    updateTreasureBoxText("LEGENDARY");

    if (ship4Opacity > 0.5 && ship4display != "none") {
      treasureBoxesValue = 40;
    }
    if (ship10Opacity > 0.5 && ship10display != "none") {
      treasureBoxesValue = 65;
    }
    if (ship19Opacity > 0.5 && ship19display != "none") {
      treasureBoxesValue = 90;
    }
    if (ship31Opacity > 0.5 && ship31display != "none") {
      treasureBoxesValue = 120;
    }
  } else {
    updateTreasureBoxText("");
  }

  document.getElementById("treasureBoxes").value = treasureBoxesValue;
}

const selectItems2 = document.querySelectorAll(".select-items");

selectItems2.forEach((item, index) => {
  item.addEventListener("click", (event) => {
    const selectValue = event.target.getAttribute("data-value");
    const input = item.nextElementSibling;
    input.value = selectValue;

    updateTreasureBoxes();
  });
});

const shipElements = document.querySelectorAll(
  "#container .ship4, #container .ship10, #container .ship19, #container .ship31"
);

shipElements.forEach((ship) => {
  ship.addEventListener("change", updateTreasureBoxes);
});

document.addEventListener("DOMContentLoaded", function () {
  const rangeInput = document.querySelector(".rangeInput");

  rangeInput.addEventListener("input", function () {
    const value = this.value;
    this.parentNode.style.setProperty("--value", value);
    updateShipNumber(value);
  });
});

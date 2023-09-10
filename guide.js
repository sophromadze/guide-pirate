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
  // Update Y variable with the selected points
  Y = points;
  // console.log("Updated Y value: ", Y);
  updateDailyIncome();

  // Set X variable to 0
  X = 0;
  // console.log("Updated X value: ", X);
  updateDailyIncome();
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
  10: [120, 54],
  11: [150, 53],
  12: [181, 52],
  13: [213, 51],
  14: [246, 50],
  15: [280, 49],
  16: [315, 48],
  17: [351, 47],
  18: [388, 46],
  19: [426, 45],
  20: [480, 54],
  21: [630, 53],
  22: [790, 52],
  23: [960, 51],
  24: [1140, 50],
  25: [1330, 49],
  26: [1530, 48],
  27: [1740, 47],
  28: [1960, 46],
  29: [2190, 45],
  30: [2400, 54],
  31: [2800, 53],
  32: [3300, 52],
  33: [3900, 51],
  34: [4600, 50],
  35: [5400, 49],
  36: [6300, 48],
  37: [7300, 47],
  38: [8400, 46],
  39: [9600, 45],
  40: [10000, 54],
  41: [12000, 53],
  42: [14500, 52],
  43: [17500, 51],
  44: [21000, 50],
  45: [25000, 49],
  46: [29500, 48],
  47: [34500, 47],
  48: [40000, 46],
  49: [46000, 45],
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
    // console.log("Updated H value: ", H);
    // console.log("Updated Z value: ", Z);
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
}

function updateShipNumber2(value) {
  document.getElementById("shipNumberInput2").value = value;
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
  10: 120,
  11: 150,
  12: 181,
  13: 213,
  14: 246,
  15: 280,
  16: 315,
  17: 351,
  18: 388,
  19: 426,
  20: 480,
  21: 630,
  22: 790,
  23: 960,
  24: 1140,
  25: 1330,
  26: 1530,
  27: 1740,
  28: 1960,
  29: 2190,
  30: 2400,
  31: 2800,
  32: 3300,
  33: 3900,
  34: 4600,
  35: 5400,
  36: 6300,
  37: 7300,
  38: 8400,
  39: 9600,
  40: 10000,
  41: 12000,
  42: 14500,
  43: 17500,
  44: 21000,
  45: 25000,
  46: 29500,
  47: 34500,
  48: 40000,
  49: 46000,
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
      // Calculate the sum of all shipLvl2 points and store it in variable X
      X = sumShipLvl2Points();
      // console.log("Total shipLvl2 points (X): ", X);
      updateDailyIncome();
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

function createSelectDropdowns(numberOfDropdowns) {
  document.getElementById("container").innerHTML = "";

  // Loop to create 29 custom select elements
  for (var j = 0; j <= numberOfDropdowns; j++) {
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
    selectSelected.addEventListener("click", function () {
      // Check if any other custom select element has its select items visible
      const otherSelectItems = document.querySelectorAll(
        ".select-items.active"
      );
      otherSelectItems.forEach(function (otherSelectItem) {
        otherSelectItem.classList.remove("active");
      });

      // Toggle 'active' class to show/hide the options
      var selectItems = this.nextElementSibling;
      selectItems.classList.toggle("active");
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
          selectSelected.innerHTML =
            "SELECT <i class='fas fa-chevron-down'></i>";
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
}

createSelectDropdowns();

// Add event listener for shipLvl2 select-option click
addShipLvl2SelectItemsEventListener(shipLvlSelectItems);

// Add event listener for the pirateLvlSelectItems element
pirateLvlSelectItems.addEventListener("click", function (event) {
  const pirateLvl = parseInt(event.target.getAttribute("data-value"), 10);
  const rangeInput = document.querySelector(".rangeInput");
  const rangeSlider = document.querySelector(".range-slider");

  hideAllShipLvlSelects();

  switch (pirateLvl) {
    case 1:
      rangeInput.max = 0;
      rangeSlider.style.setProperty("--max", 0);
      document.getElementById("shipNumberInput").value = "";
      document.getElementById("shipNumberInput").placeholder =
        "YOUR PIRATE'S LEVEL IS BELOW 2";
      break;
    case 2:
      rangeInput.max = 2;
      rangeSlider.style.setProperty("--max", 2);
      document.getElementById("shipNumberInput").placeholder = "";
      document.getElementById("shipNumberInput").value = 0;
      break;
    case 3:
      rangeInput.max = 8;
      rangeSlider.style.setProperty("--max", 8);
      document.getElementById("shipNumberInput").placeholder = "";
      document.getElementById("shipNumberInput").value = 0;
      break;
    case 4:
      rangeInput.max = 18;
      rangeSlider.style.setProperty("--max", 18);
      document.getElementById("shipNumberInput").placeholder = "";
      document.getElementById("shipNumberInput").value = 0;
      break;
    case 5:
      rangeInput.max = 29;
      rangeSlider.style.setProperty("--max", 29);
      document.getElementById("shipNumberInput").placeholder = "";
      document.getElementById("shipNumberInput").value = 0;
      break;
    default:
      rangeInput.max = 0;
      rangeSlider.style.setProperty("--max", 0);
      document.getElementById("shipNumberInput").value = "";
      document.getElementById("shipNumberInput").placeholder =
        "YOUR PIRATE'S LEVEL IS BELOW 2";
      break;
  }

  // // Reset the range input value and the progress bar
  rangeInput.value = 0;
  rangeSlider.style.setProperty("--value", 0);

  // document.getElementById("shipNumberInput").value = 0;

  if (pirateLvl >= 2) {
    setRangeInputEnabled(true);
  } else {
    setRangeInputEnabled(false);
  }

  resetShipLvlSelects();
  updateTextElementVisibility();
});

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

function hideAllShipLvlSelects() {
  shipLvlSelects.forEach(function (shipLvlSelect) {
    shipLvlSelect.style.display = "none";
  });
}

function resetShipLvlSelects() {
  // Get all .shipLvl2 .select-selected elements
  var shipLvlSelectSelecteds = document.querySelectorAll(
    ".shipLvl2 .select-selected"
  );

  // Loop through each .shipLvl2 .select-selected element and reset its content
  shipLvlSelectSelecteds.forEach(function (shipLvlSelectSelected) {
    shipLvlSelectSelected.innerHTML =
      "SELECT <i class='fas fa-chevron-down'></i>";
  });

  // Loop through each .shipLvl2 custom-select element and reset the hidden input value
  var shipLvlCustomSelects = document.querySelectorAll(
    ".shipLvl2 .custom-select"
  );
  shipLvlCustomSelects.forEach(function (shipLvlCustomSelect) {
    shipLvlCustomSelect.querySelector('input[name="select-value"]').value = "";
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
  if (inputField.value === "") {
    inputField.value = 0;
  }
  if (parseInt(inputField.value) > 100) {
    inputField.value = 100;
  }
  if (parseInt(inputField.value) < 0) {
    inputField.value = 0;
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
  // console.log("Variable D:", D);
}

function updateShipNumber2(value) {
  document.querySelector("#shipNumberInput2").value = value;

  var percentage = 1; // Change this value to the desired percentage
  D = calculatePercentage(value, percentage);
  // console.log("Variable D:", D);
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

  // Check if .ship4 opacity is more than 0.5
  const ship4 = document.querySelector(".ship4");
  const ship4Opacity = parseFloat(window.getComputedStyle(ship4).opacity);

  // Check if .ship10 opacity is more than 0.5
  const ship10 = document.querySelector(".ship10");
  const ship10Opacity = parseFloat(window.getComputedStyle(ship10).opacity);

  // Check if .ship19 opacity is more than 0.5
  const ship19 = document.querySelector(".ship19");
  const ship19Opacity = parseFloat(window.getComputedStyle(ship19).opacity);

  // Check if .ship31 opacity is more than 0.5
  const ship31 = document.querySelector(".ship31");
  const ship31Opacity = parseFloat(window.getComputedStyle(ship31).opacity);

  // Get .hydra .rbStart and its h6 elements
  const rbStart = document.querySelector(".hydra .rbStart");
  const rbStartH6 = document.querySelector(".hydra h6");

  // Get .calipso .rbStart and its h6 elements
  const rbStartcalipso = document.querySelector(".calipso .rbStart");
  const rbStartH6calipso = document.querySelector(".calipso h6");

  // Get .kraken .rbStart and its h6 elements
  const rbStartkraken = document.querySelector(".kraken .rbStart");
  const rbStartH6kraken = document.querySelector(".kraken h6");

  // Get .poseidon .rbStart and its h6 elements
  const rbStartposeidon = document.querySelector(".poseidon .rbStart");
  const rbStartH6poseidon = document.querySelector(".poseidon h6");

  // Add or remove .active class based on ship4Opacity and shipLvlDataValue
  if (ship4Opacity > 0.5 && shipLvlDataValue) {
    rbStart.classList.add("active");
    rbStartH6.classList.add("active");
  } else {
    rbStart.classList.remove("active");
    rbStartH6.classList.remove("active");
  }

  // Add or remove .active class based on ship10Opacity and shipLvlDataValue
  if (ship10Opacity > 0.5 && shipLvlDataValue) {
    rbStartcalipso.classList.add("active");
    rbStartH6calipso.classList.add("active");
  } else {
    rbStartcalipso.classList.remove("active");
    rbStartH6calipso.classList.remove("active");
  }

  // Add or remove .active class based on ship19Opacity and shipLvlDataValue
  if (ship19Opacity > 0.5 && shipLvlDataValue) {
    rbStartkraken.classList.add("active");
    rbStartH6kraken.classList.add("active");
  } else {
    rbStartkraken.classList.remove("active");
    rbStartH6kraken.classList.remove("active");
  }

  // Add or remove .active class based on ship31Opacity and shipLvlDataValue
  if (ship31Opacity > 0.5 && shipLvlDataValue) {
    rbStartposeidon.classList.add("active");
    rbStartH6poseidon.classList.add("active");
  } else {
    rbStartposeidon.classList.remove("active");
    rbStartH6poseidon.classList.remove("active");
  }
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
updateCustomSelectsState();

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
      shipLvl === 19 ||
      shipLvl === 29 ||
      shipLvl === 39 ||
      shipLvl === 49
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
    document.getElementById("dailyIncome").value =
      dailyIncomeInput.toFixed(2) + " PPT";

    // Calculate 10% of the dailyIncomeInput
    let shipFixingPrice = dailyIncomeInput * 0.1;
    document.getElementById("shipFixcingPrice").value =
      shipFixingPrice.toFixed(2) + " PPT";
  }
}

// function updateShipNumber(value) {
//   const shipNumberInput = document.getElementById("shipNumberInput");

//   if (shipNumberInput) {
//     shipNumberInput.value = value;
//     shipNumberInput.placeholder = value;
//     console.log("shipNumberInput value:", value);
//   }
// }

//  treasure boxes
function getComputedStyleValue(element, property) {
  return window.getComputedStyle(element).getPropertyValue(property);
}

function resetContainerValues() {
  const shipElements = document.querySelectorAll(
    "#container .ship4, #container .ship10, #container .ship19, #container .ship31"
  );

  shipElements.forEach((ship) => {
    ship.style.opacity = 0;
  });
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

  // Check if either pirateLvl or shipLvl is 0
  if (pirateLvl == 0 || shipLvl == 0) {
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

  let treasureBoxesValue = 0;

  if (shipLvl >= 1 && shipLvl <= 9) {
    treasureBoxesValue = 10;
    updateTreasureBoxText("COMMON");

    if (ship4Opacity > 0.5) {
      treasureBoxesValue = 20;
    }
    if (ship10Opacity > 0.5) {
      treasureBoxesValue = 45;
    }
    if (ship19Opacity > 0.5) {
      treasureBoxesValue = 70;
    }
    if (ship31Opacity > 0.5) {
      treasureBoxesValue = 100;
    }
  } else if (pirateLvl >= 1 && shipLvl >= 10 && shipLvl <= 19) {
    treasureBoxesValue = 15;
    updateTreasureBoxText("UNCOMMON");

    if (ship4Opacity > 0.5) {
      treasureBoxesValue = 25;
    }
    if (ship10Opacity > 0.5) {
      treasureBoxesValue = 50;
    }
    if (ship19Opacity > 0.5) {
      treasureBoxesValue = 75;
    }
    if (ship31Opacity > 0.5) {
      treasureBoxesValue = 105;
    }
  } else if (pirateLvl >= 1 && shipLvl >= 20 && shipLvl <= 29) {
    treasureBoxesValue = 20;
    updateTreasureBoxText("RARE");

    if (ship4Opacity > 0.5) {
      treasureBoxesValue = 30;
    }
    if (ship10Opacity > 0.5) {
      treasureBoxesValue = 55;
    }
    if (ship19Opacity > 0.5) {
      treasureBoxesValue = 80;
    }
    if (ship31Opacity > 0.5) {
      treasureBoxesValue = 110;
    }
  } else if (pirateLvl >= 1 && shipLvl >= 30 && shipLvl <= 39) {
    treasureBoxesValue = 25;
    updateTreasureBoxText("EPIC");

    if (ship4Opacity > 0.5) {
      treasureBoxesValue = 35;
    }
    if (ship10Opacity > 0.5) {
      treasureBoxesValue = 60;
    }
    if (ship19Opacity > 0.5) {
      treasureBoxesValue = 85;
    }
    if (ship31Opacity > 0.5) {
      treasureBoxesValue = 115;
    }
  } else if (pirateLvl >= 1 && shipLvl >= 40 && shipLvl <= 49) {
    treasureBoxesValue = 30;
    updateTreasureBoxText("LEGENDARY");

    if (ship4Opacity > 0.5) {
      treasureBoxesValue = 40;
    }
    if (ship10Opacity > 0.5) {
      treasureBoxesValue = 65;
    }
    if (ship19Opacity > 0.5) {
      treasureBoxesValue = 90;
    }
    if (ship31Opacity > 0.5) {
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

    if (index === 0) {
      // pirateLvl select-item
      resetContainerValues();
    }

    updateTreasureBoxes();
  });
});

const shipElements = document.querySelectorAll(
  "#container .ship4, #container .ship10, #container .ship19, #container .ship31"
);

shipElements.forEach((ship) => {
  ship.addEventListener("change", updateTreasureBoxes);
});

// const inter = setInterval(() => {
//   updateDailyIncome();
//   console.log("interval");
// }, 100);

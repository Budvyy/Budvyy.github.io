export function parseTSV(tsvData) {
  const rows = tsvData.split("\n").filter(row => row.trim());
  const header = rows[0].split("\t");
  const data = rows.slice(1).map(row => row.split("\t"));

  const container = document.getElementById("cards-container");

  // Clear previous cards
  container.innerHTML = '';

  // Use a document fragment to improve performance
  const fragment = document.createDocumentFragment();
  const cards = [];

  // Get the current list from localStorage
  const myList = JSON.parse(localStorage.getItem("myList")) || [];

  data.forEach(row => {
    const card = document.createElement("div");
    card.className = "card";

    // Ensure the card has a relative position to position the rank circle correctly
    card.style.position = "relative";

    // Title (Power Name)
    const powerName = row[header.indexOf("Power")];
    const title = document.createElement("h3");
    title.textContent = powerName;
    card.appendChild(title);

    // Subtitle (Flavor Text)
    const flavorText = row[header.indexOf("Flavor Text")];
    const subtitle = document.createElement("p");
    subtitle.textContent = flavorText;
    subtitle.className = "flavor-text";
    card.appendChild(subtitle);

    // Set Power Set Color Coding
    const powerset = row[header.indexOf("Power Set")];
    card.setAttribute("data-powerset", powerset);

    let backgroundColor = "#fff";  // Default color (white)
    let textColor = "#000";  // Default text color (black)
    let isDarkBackground = false;  // Flag to check if the background is dark

    // Color coding logic
    switch (powerset) {
      case "Telepathy":
        backgroundColor = "#7b1fa2"; // Purple
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "None":
        backgroundColor = "#616161"; // Gray
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Martial Arts":
        backgroundColor = "#d32f2f"; // Dark Red
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Teleportation":
        backgroundColor = "#1976d2"; // Blue
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Weather Control":
        backgroundColor = "#0288d1"; // Light Blue
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Power Control":
        backgroundColor = "#388e3c"; // Green
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Ranged weapons":
        backgroundColor = "#fbc02d"; // Yellow
        textColor = "#fff"; // Black text
        break;
      case "Elemental Control":
        backgroundColor = "#ffcc00"; // Yellow
        textColor = "#fff"; // Black text
        break;
      case "Plasticity":
        backgroundColor = "#f57c00"; // Orange
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Super-Strength":
        backgroundColor = "#455a64"; // Steel Blue-Gray
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Translation":
        backgroundColor = "#0288d1"; // Blue
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Melee Weapons":
        backgroundColor = "#757575"; // Grey
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Resize":
        backgroundColor = "#9e9e9e"; // Light Grey
        textColor = "#fff"; // Black text
        break;
      case "Illusion":
        backgroundColor = "#8e24aa"; // Magenta
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Shield Bearer":
        backgroundColor = "#0d47a1"; // Dark Blue
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Tactics":
        backgroundColor = "#0288d1"; // Blue
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Telekinesis":
        backgroundColor = "#1976d2"; // Blue
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Magic":
        backgroundColor = "#6a1b9a"; // Purple
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Phasing":
        backgroundColor = "#388e3c"; // Green
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Healing":
        backgroundColor = "#ff6699"; // Pink
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Luck":
        backgroundColor = "#fbc02d"; // Yellow
        textColor = "#fff"; // Black text
        break;
      case "Super-Speed":
        backgroundColor = "#ff5722"; // Deep Orange
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Spider-Powers":
        backgroundColor = "#c2185b"; // Pink
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Omniversal Travel":
        backgroundColor = "#512da8"; // Indigo
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      case "Sixth Sense":
        backgroundColor = "#3f51b5"; // Indigo
        textColor = "#fff"; // White text
        isDarkBackground = true;
        break;
      default:
        backgroundColor = "#f5f5f5"; // Default Light Grey
        textColor = "#fff"; // Black text
        break;
    }

    // Apply colors to card
    card.style.backgroundColor = backgroundColor;
    card.style.color = textColor;

    // Text shadow for better readability on dark backgrounds
    if (isDarkBackground) {
      card.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.5)";
    } else {
      card.style.textShadow = "none";
    }

    // Get the Rank value from the row using the correct index
    const rank = row[10];

    // Create Rank element and set its content
    const rankElement = document.createElement("span");
    rankElement.textContent = `${rank}`; // Display the rank value
    rankElement.className = "rank-circle"; // Updated class name

    // Append the Rank element to the card
    card.appendChild(rankElement);

    // Details (Hidden by Default)
    const details = document.createElement("div");
    details.className = "details";
    details.style.display = "none"; // Hidden initially
    row.forEach((value, index) => {
      if (header[index] !== "Rank") { // Exclude rank from details
        const detailItem = document.createElement("p");
        detailItem.textContent = `${header[index]}: ${value}`;
        details.appendChild(detailItem);
      }
    });
    card.appendChild(details);

    // Read More Button
    const readMore = document.createElement("button");
    readMore.textContent = "Read More";
    readMore.className = "read-more-btn";
    readMore.addEventListener("click", () => {
      const isExpanded = details.style.display === "block";
      details.style.display = isExpanded ? "none" : "block";
      readMore.textContent = isExpanded ? "Read More" : "Show Less";
    });
    card.appendChild(readMore);

    // Add to List Button
    const addToListBtn = document.createElement("button");
    const isInList = myList.find(item => item.powerName === powerName);
    addToListBtn.textContent = isInList ? "Remove from List" : "Add to List";
    addToListBtn.className = "add-to-list-btn";
    if (isInList) {
      addToListBtn.style.backgroundColor = "#ff4d4d"; // Red color for "Remove from List"
    }
    addToListBtn.addEventListener("click", () => {
      if (addToListBtn.textContent === "Add to List") {
        addToList({
          powerName,
          flavorText,
          powerset,
          rank
        });
        addToListBtn.textContent = "Remove from List";
        addToListBtn.style.backgroundColor = "#ff4d4d"; // Red color for "Remove from List"
      } else {
        removeFromList(powerName);
        addToListBtn.textContent = "Add to List";
        addToListBtn.style.backgroundColor = ""; // Reset to default color
      }
    });
    card.appendChild(addToListBtn);

    // Add the 'data-rank' attribute to the card
    card.setAttribute('data-rank', rank);

    // Add hover event listener to update sidebar
    card.addEventListener("mouseover", () => {
      const sidebarContent = document.getElementById("sidebar-content");
      sidebarContent.innerHTML = `
        <h3>${powerName}</h3>
        <p><strong>Flavor Text:</strong> ${flavorText}</p>
        <p><strong>Power Set:</strong> ${powerset}</p>
        <p><strong>Rank:</strong> ${rank}</p>
        ${details.innerHTML}
      `;
    });

    // Store the card in allCards array
    cards.push(card);

    // Append the card to the document fragment
    fragment.appendChild(card);
  });

  // Append all cards to the container in one go
  container.appendChild(fragment);

  return cards;
}

export function addToList(card) {
  let myList = JSON.parse(localStorage.getItem("myList")) || [];

  // Check for duplicates
  if (myList.find(item => item.powerName === card.powerName)) {
    return;
  }

  myList.push(card);
  localStorage.setItem("myList", JSON.stringify(myList));
}

export function removeFromList(powerName) {
  let myList = JSON.parse(localStorage.getItem("myList")) || [];
  myList = myList.filter(item => item.powerName !== powerName);
  localStorage.setItem("myList", JSON.stringify(myList));
}
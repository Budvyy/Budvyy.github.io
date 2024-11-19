// Function to parse TSV data and create cards
let allCards = []; // Store all parsed cards to allow filtering

function parseTSV(tsvData) {
  const rows = tsvData.split("\n").filter(row => row.trim());
  const header = rows[0].split("\t");
  const data = rows.slice(1).map(row => row.split("\t"));

  const container = document.getElementById("cards-container");

  // Clear previous cards
  container.innerHTML = '';

  // Use a document fragment to improve performance
  const fragment = document.createDocumentFragment();

  data.forEach(row => {
    const card = document.createElement("div");
    card.className = "card";

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

    // Color coding logic (same as provided)
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
        backgroundColor = "#8e24aa"; // Magenta
        textColor = "#fff"; // White text
        isDarkBackground = true;
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
        backgroundColor = "#8bc34a"; // Light Green
        textColor = "#fff"; // Black text
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
      card.style.textShadow = "1px 1px 5px rgba(0, 0, 0, 0.7)";
    } else {
      card.style.textShadow = "1px 1px 2px rgba(255, 255, 255, 0.7)";
    }

    // Get the Rank value from the row using the correct index
    const rankIndex = header.indexOf("Rank Can Learn"); // Find the index
    const rank = row[10];

    // Create Rank element and set its content
    const rankElement = document.createElement("span");
    rankElement.textContent = "Rank: " + rank; // Update text content
    rankElement.className = "rank"; // Add a class for styling

    // Append the Rank element to the card
    card.appendChild(rankElement);

    // Details (Hidden by Default)
    const details = document.createElement("div");
    details.className = "details";
    details.style.display = "none"; // Hidden initially
    row.forEach((value, index) => {
      const detailItem = document.createElement("p");
      detailItem.textContent = `${header[index]}: ${value}`;
      details.appendChild(detailItem);
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

    // Add the 'data-rank' attribute to the card
    card.setAttribute('data-rank', rank);

    // Store the card in allCards array
    allCards.push(card);

    // Append the card to the document fragment
    fragment.appendChild(card);
  });

  // Append all cards to the container in one go
  container.appendChild(fragment);

  // Sort cards alphabetically by default
  sortCards('alphabetical');
}

// Function to filter cards based on Power Set and Rank
function filterCards() {
  const powersetFilter = document.getElementById("powerset-filter").value;
  const rankFilter = parseInt(document.getElementById("rank-filter").value, 10);

  const container = document.getElementById("cards-container");
  container.innerHTML = ''; // Clear current cards

  const filteredCards = allCards.filter(card => {
    const powersetMatch = powersetFilter === "All" || card.getAttribute('data-powerset') === powersetFilter;

    // Use the 'data-rank' attribute for filtering
    const rankMatch = (rankFilter === 0) || (parseInt(card.getAttribute('data-rank'), 10) <= rankFilter);

    return powersetMatch && rankMatch;
  });

  // Append the filtered cards
  filteredCards.forEach(card => container.appendChild(card));
}

// Function to sort cards
function sortCards(sortBy) {
  const container = document.getElementById("cards-container");
  container.innerHTML = ''; // Clear current cards

  allCards.sort((a, b) => {
    if (sortBy === 'alphabetical') {
      const powerA = a.querySelector("h3").textContent.toLowerCase();
      const powerB = b.querySelector("h3").textContent.toLowerCase();
      return powerA.localeCompare(powerB); // Alphabetical sorting
    } else if (sortBy === 'rank') {
      // Convert rank values to numbers
      const rankA = parseInt(a.getAttribute('data-rank'), 10);
      const rankB = parseInt(b.getAttribute('data-rank'), 10);
      return rankA - rankB; // Sort by rank numerically
    }
  });

  // Append the sorted cards
  allCards.forEach(card => container.appendChild(card));
}

// Load TSV file on DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  fetch("data.tsv")
    .then(response => response.text())
    .then(parseTSV)
    .catch(err => console.error("Error loading TSV file:", err));
});

// Handle filter changes
document.getElementById("powerset-filter").addEventListener("change", filterCards);
document.getElementById("rank-filter").addEventListener("change", filterCards);

// Event listener for the sort dropdown
document.getElementById("sort-by").addEventListener("change", () => {
  const sortBy = document.getElementById("sort-by").value; // Get value from dropdown
  sortCards(sortBy.toLowerCase()); // Call the sortCards function
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
  });
};
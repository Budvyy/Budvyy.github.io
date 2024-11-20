import { parseTSV, addToList } from './parser.js';

let allCards = []; // Store all parsed cards to allow filtering

// Modified filterCards function
function filterCards() {
  const powersetFilter = document.getElementById("powerset-filter").value;
  const rankFilter = parseInt(document.getElementById("rank-filter").value, 10);
  const currentSort = document.getElementById("sort-by").value.toLowerCase();

  const container = document.getElementById("cards-container");
  container.innerHTML = ''; // Clear current cards

  // Filter cards
  const filteredCards = allCards.filter(card => {
    const powersetMatch = powersetFilter === "All" || card.getAttribute('data-powerset') === powersetFilter;
    const rankMatch = (rankFilter === 0) || (parseInt(card.getAttribute('data-rank'), 10) <= rankFilter);
    return powersetMatch && rankMatch;
  });

  // Sort filtered cards using existing sort logic
  filteredCards.sort((a, b) => {
    if (currentSort === 'alphabetical') {
      const powerA = a.querySelector("h3").textContent.toLowerCase();
      const powerB = b.querySelector("h3").textContent.toLowerCase();
      return powerA.localeCompare(powerB);
    } else if (currentSort === 'rank') {
      const rankA = parseInt(a.getAttribute('data-rank'), 10);
      const rankB = parseInt(b.getAttribute('data-rank'), 10);
      return rankA - rankB;
    }
  });

  // Append the filtered and sorted cards
  filteredCards.forEach(card => container.appendChild(card));
}

// Modified sortCards function
function sortCards(sortBy) {
  const powersetFilter = document.getElementById("powerset-filter").value;
  const rankFilter = parseInt(document.getElementById("rank-filter").value, 10);
  const container = document.getElementById("cards-container");
  
  // Clear current cards
  container.innerHTML = '';

  // First filter the cards
  const filteredCards = allCards.filter(card => {
    const powersetMatch = powersetFilter === "All" || card.getAttribute('data-powerset') === powersetFilter;
    const rankMatch = (rankFilter === 0) || (parseInt(card.getAttribute('data-rank'), 10) <= rankFilter);
    return powersetMatch && rankMatch;
  });

  // Then sort the filtered cards
  filteredCards.sort((a, b) => {
    if (sortBy === 'alphabetical') {
      const powerA = a.querySelector("h3").textContent.toLowerCase();
      const powerB = b.querySelector("h3").textContent.toLowerCase();
      return powerA.localeCompare(powerB);
    } else if (sortBy === 'rank') {
      const rankA = parseInt(a.getAttribute('data-rank'), 10);
      const rankB = parseInt(b.getAttribute('data-rank'), 10);
      return rankA - rankB;
    }
  });

  // Append the sorted and filtered cards
  filteredCards.forEach(card => container.appendChild(card));
}

// Load TSV file on DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  fetch("data.tsv")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(tsvData => {
      allCards = parseTSV(tsvData);
      sortCards('alphabetical');
    })
    .catch(err => console.error("Error loading TSV file:", err));
});

// Handle filter changes
document.getElementById("powerset-filter").addEventListener("change", filterCards);
document.getElementById("rank-filter").addEventListener("change", filterCards);

// Update the event listener for the sort dropdown
document.getElementById("sort-by").addEventListener("change", () => {
  const sortBy = document.getElementById("sort-by").value;
  sortCards(sortBy.toLowerCase());
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
  });
};
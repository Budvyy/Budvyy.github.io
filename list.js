document.addEventListener("DOMContentLoaded", () => {
  displayMyList();

  document.getElementById("printList").addEventListener("click", () => {
    window.print();
  });

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
    });
  }
});

function parseTSV(data) {
  const lines = data.split('\n');
  const headers = lines[0].split('\t');
  const powers = lines.slice(1).map(line => {
    const values = line.split('\t');
    const power = {};
    headers.forEach((header, index) => {
      power[header] = values[index];
    });
    return power;
  });
  return powers;
}

function fetchPowersData() {
  return fetch('data.tsv')
    .then(response => response.text())
    .then(data => parseTSV(data));
}

function displayMyList() {
  const myList = JSON.parse(localStorage.getItem("myList")) || [];
  const container = document.getElementById("myList-container");
  container.innerHTML = '';

  if (myList.length === 0) {
    container.innerHTML = "<p>Your list is empty.</p>";
    return;
  }

  fetchPowersData().then(powersData => {
    myList.sort((a, b) => a.powerName.localeCompare(b.powerName));

    myList.forEach((power, index) => {
      const powerData = powersData.find(p => p.Power === power.powerName);
      const card = document.createElement("div");
      card.className = "card printer-friendly";

      const title = document.createElement("h3");
      title.textContent = power.powerName;
      card.appendChild(title);

      const flavorText = document.createElement("p");
      flavorText.textContent = power.flavorText;
      flavorText.className = "flavor-text";
      card.appendChild(flavorText);

      const powerset = document.createElement("p");
      powerset.textContent = `Power Set: ${power.powerset}`;
      card.appendChild(powerset);

      const rank = document.createElement("p");
      rank.textContent = `Rank: ${power.rank}`;
      card.appendChild(rank);

      // Display all details from TSV
      if (powerData) {
        Object.entries(powerData).forEach(([key, value]) => {
          if (key !== "Power" && value) {
            const detail = document.createElement("p");
            detail.textContent = `${key}: ${value}`;
            card.appendChild(detail);
          }
        });
      }

      // Remove Button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.className = "remove-btn";
      removeBtn.addEventListener("click", () => {
        removeFromList(index);
      });
      card.appendChild(removeBtn);
      card.insertBefore(removeBtn, card.firstChild); // Move the remove button to the top

      container.appendChild(card);
    });
  });
}

function removeFromList(index) {
  let myList = JSON.parse(localStorage.getItem("myList")) || [];
  myList.splice(index, 1);
  localStorage.setItem("myList", JSON.stringify(myList));
  displayMyList();
}

// Add CSS for printer-friendly format
const style = document.createElement('style');
style.textContent = `
  @media print {
    body {
      background: white;
      color: black;
      font-size: 10pt;
    }

    header, .navigation, .dark-mode-toggle, .print-btn {
      display: none;
    }

    .cards-container {
      display: block;
    }

    .card {
      page-break-inside: avoid;
      border: 1px solid #000;
      padding: 10px;
      margin-bottom: 10px;
      font-size: 10pt;
      width: calc(100% - 40px); /* Adjust width to fit within page margins */
      height: auto;
      overflow: visible;
      margin-left: auto;
      margin-right: auto;
      position: relative; /* Ensure positioning for the remove button */
    }

    .card h3, .card p {
      font-size: 10pt;
      margin: 0;
      padding: 0;
    }

    .remove-btn {
      display: none;
    }
  }

  .card .remove-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .card .remove-btn:hover {
    background-color: #ff1a1a;
  }
`;
document.head.appendChild(style);

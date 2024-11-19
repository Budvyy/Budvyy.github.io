const samplePowers = [
    "Super Strength",
    "Telekinesis",
    "Healing",
    "Martial Arts",
    "Illusion",
    "Teleportation"
];

// Initialize sample powers in dropdown
const charPowerSelect = document.getElementById("charPower");
samplePowers.forEach(power => {
    const option = document.createElement("option");
    option.value = power;
    option.textContent = power;
    charPowerSelect.appendChild(option);
});

// Toggle dark mode
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
});

// Add new power dynamically
document.getElementById("addNewPowerBtn").addEventListener("click", () => {
    const newPowerInput = document.getElementById("newPowerInput");
    if (newPowerInput.style.display === "none") {
        newPowerInput.style.display = "block";
    } else {
        const newPower = newPowerInput.value.trim();
        if (newPower) {
            const option = document.createElement("option");
            option.value = newPower;
            option.textContent = newPower;
            charPowerSelect.appendChild(option);
            newPowerInput.value = "";
            newPowerInput.style.display = "none";
            alert(`${newPower} added to the list of powers!`);
        }
    }
});

// Save character and preview
document.getElementById("saveCharacter").addEventListener("click", () => {
    const name = document.getElementById("charName").value.trim();
    const description = document.getElementById("charDescription").value.trim();
    const selectedPower = charPowerSelect.value;

    // Update preview
    document.getElementById("previewName").textContent = name || "N/A";
    document.getElementById("previewDescription").textContent = description || "N/A";

    const previewPowers = document.getElementById("previewPowers");
    previewPowers.innerHTML = "";
    const powerItem = document.createElement("li");
    powerItem.textContent = selectedPower;
    previewPowers.appendChild(powerItem);
});
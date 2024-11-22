class PowerData {
    constructor() {
        this.powers = new Map(); // Store powers with their names as keys
        this.selectedPowers = new Set();
        this.columnTitles = [];
        this.lastHoveredPower = null;
    }

    async parseTSVContent(content) {
        const lines = content.split('\n');
        if (lines.length > 0) {
            this.columnTitles = lines[0].split('\t'); // Store column titles
        }

        for (const line of lines.slice(1)) { // Skip the first line (column titles)
            const columns = line.split('\t');
            if (columns.length >= 11 && columns[0].trim()) {
                const name = columns[0].trim();
                const prerequisites = columns[3].trim(); // Specifically get the prerequisites column
                const effect = columns[9].trim(); // Specifically get the effect column
                const rank = columns[10].trim(); // Specifically get the rank column
                this.powers.set(name, {
                    name: name,
                    prerequisites: prerequisites || 'None',
                    effect: effect || 'None',
                    rank: rank || 'None',
                    // Store all columns
                    data: columns
                });
            }
        }
    }

    getPowerPrerequisites(powerName) {
        return this.powers.get(powerName)?.prerequisites || 'Power not found';
    }

    getAllPowers() {
        return Array.from(this.powers.values());
    }

    displayPowers() {
        const container = document.getElementById('available-powers-container'); // Correct container ID
        container.innerHTML = ''; // Clear existing content

        const selectedRank = parseInt(document.getElementById('rank-select').value, 10);
        const selectedPowersets = Array.from(document.querySelectorAll('.powerset-select'))
            .map(select => select.value)
            .filter(value => value !== '');
        const selectedTraits = Array.from(document.querySelectorAll('.trait-select'))
            .map(select => select.value)
            .filter(value => value !== '');

        const sortedPowers = Array.from(this.powers.values())
            .filter(power => selectedPowersets.includes(power.data[2]) && parseInt(power.rank, 10) <= selectedRank)
            .filter(power => {
                const prerequisites = power.prerequisites.split(',').map(prereq => prereq.trim());
                const traitPrerequisites = ['Cursed', 'Sorcerous', 'Chaotic'];
                const hasTraitPrerequisite = prerequisites.some(prereq => traitPrerequisites.includes(prereq));
                return !hasTraitPrerequisite || prerequisites.some(prereq => selectedTraits.includes(prereq));
            })
            .sort((a, b) => a.name.localeCompare(b.name));

        // Create a Set of power names for matching
        const powerNames = new Set(sortedPowers.map(p => p.name.toLowerCase()));

        sortedPowers.forEach((power, index) => {
            const powerElement = document.createElement('div');
            powerElement.className = 'power-item';
            powerElement.style.height = '150px'; // Set a fixed height to prevent layout shifts

            // Format prerequisites
            let formattedPrerequisites = power.prerequisites;

            // Split prerequisites on commas
            formattedPrerequisites = formattedPrerequisites.split(',').map(prereq => {
                let trimmed = prereq.trim();

                // Highlight Rank text
                trimmed = trimmed.replace(/(Rank\s+\d+)/gi, '<span class="rank-text">$1</span>');

                // Check if prerequisite matches a power name
                if (powerNames.has(trimmed.toLowerCase())) {
                    return `<span class="power-prereq-match">${trimmed}</span>`;
                }

                return trimmed;
            }).join(', ');

            powerElement.innerHTML = `
                <div class="power-header">
                    <h3>${power.name}</h3>
                    <div class="first-column"><em>${power.data[2]}</em></div> <!-- Move powerset to the right of the power name -->
                </div>
                <p class="flavor-text">${power.data[1]}</p> <!-- Add flavor text here -->
                <p class="prerequisites">
                    <strong>Prerequisites:</strong> ${formattedPrerequisites}
                </p>
            `;
            powerElement.style.color = this.getPowersetColor(power.data[2]); // Apply color based on powerset
            container.appendChild(powerElement);

            powerElement.addEventListener('click', () => {
                this.togglePowerSelection(power.name, powerElement);
            });

            powerElement.addEventListener('mouseover', () => {
                this.lastHoveredPower = power;
                this.displayPowerDetails(power);
            });

            // Display the first power's details by default if no power has been hovered over
            if (index === 0 && !this.lastHoveredPower) {
                this.displayPowerDetails(power);
            }
        });
    }

    getPowersetColor(powerset) {
        switch (powerset) {
            case 'Elemental Control':
                return '#ffcc00'; // Yellow
            case 'Healing':
                return '#00cc66'; // Green
            case 'Illusion':
                return '#cc00cc'; // Purple
            case 'Martial Arts':
                return '#ffcc00'; // Yellow
            // Add more cases for other powersets
            case 'Luck':
                return '#ff9900'; // Orange
            case 'Melee Weapons':
                return '#cc0000'; // Red
            case 'Magic':
                return '#6600cc'; // Dark Purple
            case 'Omniversal Travel':
                return '#0099cc'; // Light Blue
            case 'Phasing':
                return '#999999'; // Grey
            case 'Power Control':
                return '#ff66cc'; // Pink
            case 'Plasticity':
                return '#ff6600'; // Orange
            case 'Ranged weapons':
                return '#cc3300'; // Dark Red
            case 'Resize':
                return '#33cc33'; // Light Green
            case 'Shield Bearer':
                return '#3366cc'; // Blue
            case 'Sixth Sense':
                return '#ffcc99'; // Peach
            case 'Spider-Powers':
                return '#cc0000'; // Red
            case 'Super-Speed':
                return '#ffcc00'; // Yellow
            case 'Super-Strength':
                return '#cc0000'; // Red
            case 'Tactics':
                return '#6666cc'; // Indigo
            case 'Telekinesis':
                return '#9933cc'; // Purple
            case 'Telepathy':
                return '#cc33ff'; // Magenta
            case 'Teleportation':
                return '#33ccff'; // Cyan
            case 'Translation':
                return '#ffcc66'; // Light Orange
            case 'Weather Control':
                return '#3399ff'; // Sky Blue
            default:
                return '#ffffff'; // Default color
        }
    }

    displayPowerDetails(power) {
        const detailsContainer = document.getElementById('power-details-container');
        detailsContainer.innerHTML = `
            <h3>${power.name}</h3>
            <p><strong>Prerequisites:</strong> ${power.prerequisites}</p>
            <p><strong>Effect:</strong> ${power.effect}</p>
            <p><strong>Rank:</strong> ${power.rank}</p>
            ${this.getCustomDetails(power)}
        `;
    }

    getCustomDetails(power) {
        // Customize which columns to display
        const columnsToDisplay = [1, 2, 4, 5,6,7,8];
        return columnsToDisplay.map(index => `<p><strong>${this.columnTitles[index]}:</strong> ${power.data[index]}</p>`).join('');
    }
    
    togglePowerSelection(powerName, powerElement) {
        const rank = parseInt(document.getElementById('rank-select').value, 10);
        const maxPowers = rank * 4; // Example calculation

        if (this.selectedPowers.has(powerName)) {
            this.selectedPowers.delete(powerName);
            document.getElementById('available-powers-container').appendChild(powerElement);
            console.log(`Moved ${powerName} to available powers`);
            this.sortAvailablePowers();

            // Unselect powers that have this power as a prerequisite
            this.powers.forEach((power, name) => {
                if (power.prerequisites.includes(powerName) && this.selectedPowers.has(name)) {
                    const prereqElement = Array.from(document.querySelectorAll('.power-item')).find(item => item.querySelector('h3').textContent === name);
                    if (prereqElement) {
                        this.togglePowerSelection(name, prereqElement);
                    }
                }
            });
        } else {
            if (this.selectedPowers.size >= maxPowers) {
                alert(`You can only select up to ${maxPowers} powers.`);
                return;
            }

            // Automatically select prerequisite powers
            const prerequisites = this.powers.get(powerName)?.prerequisites.split(',').map(prereq => prereq.trim());
            prerequisites.forEach(prereq => {
                if (this.powers.has(prereq) && !this.selectedPowers.has(prereq)) {
                    const prereqElement = Array.from(document.querySelectorAll('.power-item')).find(item => item.querySelector('h3').textContent === prereq);
                    if (prereqElement) {
                        this.togglePowerSelection(prereq, prereqElement);
                    }
                }
            });

            this.selectedPowers.add(powerName);
            document.getElementById('selected-powers-container').appendChild(powerElement);
            console.log(`Moved ${powerName} to selected powers`);
        }

        this.updatePowersLeft(maxPowers);
    }

    unselectAllPowers() {
        const selectedPowersContainer = document.getElementById('selected-powers-container');
        const powerItems = Array.from(selectedPowersContainer.getElementsByClassName('power-item'));
        powerItems.forEach(item => {
            const powerName = item.querySelector('h3').textContent;
            this.togglePowerSelection(powerName, item);
        });
    }

    updatePowersLeft(maxPowers) {
        const traitSelects = document.querySelectorAll('.trait-select');
        const unselectedTraitsCount = Array.from(traitSelects).filter(select => select.value === '').length;
        const adjustedMaxPowers = maxPowers + unselectedTraitsCount;

        const powersLeft = adjustedMaxPowers - this.selectedPowers.size;
        document.getElementById('powers-left').textContent = `Powers left to select: ${powersLeft}`;
    }

    sortAvailablePowers() {
        const container = document.getElementById('available-powers-container');
        const powerItems = Array.from(container.getElementsByClassName('power-item'));
        powerItems.sort((a, b) => a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent));
        powerItems.forEach(item => container.appendChild(item));
    }

    initializePowersetDropdowns() {
        const powersetSelects = document.querySelectorAll('.powerset-select');
        powersetSelects.forEach((select, index) => {
            select.addEventListener('change', () => {
                this.updatePowersetDropdowns(powersetSelects);
            });
        });
        this.updatePowersetDropdowns(powersetSelects);
    }

    updatePowersetDropdowns(powersetSelects) {
        const selectedValues = new Set();
        powersetSelects.forEach((select, index) => {
            if (index === 0 || powersetSelects[index - 1].value !== '') {
                select.disabled = false;
            } else {
                select.disabled = true;
                select.value = '';
            }
            if (select.value) {
                selectedValues.add(select.value);
            }
        });

        powersetSelects.forEach(select => {
            Array.from(select.options).forEach(option => {
                if (selectedValues.has(option.value) && option.value !== select.value) {
                    option.disabled = true;
                } else {
                    option.disabled = false;
                }
            });
        });
    }

    async toggleSpecialTraining() {
        const specialTrainingCheckbox = document.getElementById('special-training-checkbox');
        const powersetSelects = document.querySelectorAll('.powerset-select');
        const specialTrainingPowers = ['None','Martial Arts', 'Melee Weapons', 'Tactics', 'Shield Bearer', 'Ranged weapons'];
        if (specialTrainingCheckbox.checked) {
            const response = await fetch('../Data/st-powers.tsv');
            const tsvContent = await response.text();
            this.powers.clear();
            await this.parseTSVContent(tsvContent);

            powersetSelects.forEach((select, index) => {
                select.value = specialTrainingPowers[index] || '';
                select.disabled = true;
            });

            // Add basic powers to the selected powers container
            const selectedPowersContainer = document.getElementById('selected-powers-container');
            basicPowers.forEach(powerName => {
                const power = this.powers.get(powerName);
                if (power) {
                    const powerElement = document.createElement('div');
                    powerElement.className = 'power-item';
                    powerElement.innerHTML = `
                        <h3>${power.name}</h3>
                        <div class="first-column"><em>${power.data[2]}</em></div>
                        <p class="prerequisites">
                            <strong>Prerequisites:</strong> ${power.prerequisites}
                        </p>
                        <button class="select-button">Unselect</button>
                    `;
                    powerElement.style.color = this.getPowersetColor(power.data[2]);
                    selectedPowersContainer.appendChild(powerElement);

                    const selectButton = powerElement.querySelector('.select-button');
                    selectButton.addEventListener('click', () => {
                        this.togglePowerSelection(power.name, powerElement, selectButton);
                    });

                    this.selectedPowers.add(powerName);
                }
            });
        } else {
            const response = await fetch('../Data/data.tsv');
            const tsvContent = await response.text();
            this.powers.clear();
            await this.parseTSVContent(tsvContent);

            powersetSelects.forEach(select => {
                select.value = '';
                select.disabled = false;
            });

            // Remove basic powers from the selected powers container
            const selectedPowersContainer = document.getElementById('selected-powers-container');
            basicPowers.forEach(powerName => {
                const powerElement = Array.from(selectedPowersContainer.getElementsByClassName('power-item')).find(item => item.querySelector('h3').textContent === powerName);
                if (powerElement) {
                    const selectButton = powerElement.querySelector('.select-button');
                    this.togglePowerSelection(powerName, powerElement, selectButton);
                }
            });

            // Re-lock the dropdowns that should be locked
            const rankSelect = document.getElementById('rank-select');
            const rank = parseInt(rankSelect.value, 10);
            if (!isNaN(rank)) {
                const maxPowers = rank * 4;
                const selectedPowers = document.getElementById('selected-powers-container').children.length;
                if (selectedPowers >= maxPowers) {
                    powersetSelects.forEach(select => {
                        select.disabled = true;
                    });
                }
            }
        }
    }

    initializeTraitsDropdowns(rank) {
        const traitsContainer = document.getElementById('traits-container');
        traitsContainer.innerHTML = ''; // Clear existing dropdowns
        for (let i = 0; i < rank; i++) {
            const select = document.createElement('select');
            select.className = 'trait-select';
            select.innerHTML = `
                <option value="">Select Trait</option>
                <option value="Cursed">Cursed</option>
                <option value="Chaotic">Chaotic</option>
                <option value="Sorcerous">Sorcerous</option>
                <!-- Add more traits as needed -->
            `;
            select.addEventListener('change', () => {
                this.updateTraitsDropdowns();
            });
            traitsContainer.appendChild(select);
        }
        this.updateTraitsDropdowns();
    }

    updateTraitsDropdowns() {
        const traitSelects = document.querySelectorAll('.trait-select');
        traitSelects.forEach((select, index) => {
            if (index === 0 || traitSelects[index - 1].value !== '') {
                select.disabled = false;
            } else {
                select.disabled = true;
                select.value = '';
            }
        });
    }
}

// Add search functionality
function filterPowers() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const powerItems = document.querySelectorAll('#available-powers-container .power-item');

    powerItems.forEach(item => {
        const powerName = item.querySelector('h3').textContent.toLowerCase();
        const prerequisites = item.querySelector('p').textContent.toLowerCase();
        
        if (powerName.includes(searchText) || prerequisites.includes(searchText)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function showStep(step) {
    const step0Container = document.getElementById('step0-container');
    const step1Container = document.getElementById('step1-container');
    const step2Container = document.getElementById('step2-container');
    const step3Container = document.getElementById('step3-container');
    const searchInput = document.getElementById('searchInput');
    const backButton = document.getElementById('back-button');

    if (step === 0) {
        step0Container.style.display = 'block';
        step1Container.style.display = 'none';
        step2Container.style.display = 'none';
        step3Container.style.display = 'none';
        searchInput.style.display = 'none'; // Hide search bar
        backButton.style.display = 'none'; // Hide back button
    } else if (step === 1) {
        step0Container.style.display = 'none';
        step1Container.style.display = 'block';
        step2Container.style.display = 'none';
        step3Container.style.display = 'none';
        searchInput.style.display = 'none'; // Hide search bar
        backButton.style.display = 'inline-block'; // Show back button
    } else if (step === 2) {
        step0Container.style.display = 'none';
        step1Container.style.display = 'none';
        step2Container.style.display = 'block';
        step3Container.style.display = 'none';
        searchInput.style.display = 'none'; // Hide search bar
        backButton.style.display = 'inline-block'; // Show back button
    } else if (step === 3) {
        step0Container.style.display = 'none';
        step1Container.style.display = 'none';
        step2Container.style.display = 'none';
        step3Container.style.display = 'block';
        searchInput.style.display = 'block'; // Show search bar
        backButton.style.display = 'inline-block'; // Show back button
    }
}

function validateStep0() {
    const originSelect = document.getElementById('origin-select');
    return originSelect.value !== '';
}

function validateStep1() {
    const rankSelect = document.getElementById('rank-select');
    const powersetSelects = document.querySelectorAll('.powerset-select');
    const atLeastOneFilled = Array.from(powersetSelects).some(select => select.value !== '');
    return rankSelect.value !== '' && atLeastOneFilled;
}

function updatePowerCount() {
    const rankSelect = document.getElementById('rank-select');
    const powerCountSpan = document.getElementById('power-count');
    const rank = parseInt(rankSelect.value, 10);

    if (!isNaN(rank)) {
        powerCountSpan.textContent = `You get ${rank * 4} powers`; // Example calculation
    } else {
        powerCountSpan.textContent = '';
    }
}

// Initialize power data when document loads
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('../Data/data.tsv');
    const tsvContent = await response.text();

    const powerData = new PowerData();
    await powerData.parseTSVContent(tsvContent);

    document.getElementById('next-button').addEventListener('click', () => {
        const currentStep = document.querySelector('#step3-container').style.display === 'block' ? 3 :
                            document.querySelector('#step2-container').style.display === 'block' ? 2 :
                            document.querySelector('#step1-container').style.display === 'block' ? 1 : 0;
        if (currentStep === 0 && validateStep0()) {
            showStep(1);
        } else if (currentStep === 1 && validateStep1()) {
            showStep(2);
        } else if (currentStep === 2) {
            showStep(3);
            powerData.displayPowers();
            const rank = parseInt(document.getElementById('rank-select').value, 10);
            const maxPowers = rank * 4; // Example calculation
            powerData.updatePowersLeft(maxPowers);
        } else {
            alert('Please fill in the required fields before proceeding.');
        }
    });

    document.getElementById('back-button').addEventListener('click', () => {
        const currentStep = document.querySelector('#step3-container').style.display === 'block' ? 3 : 2;
        if (currentStep === 3) {
            showStep(2);
        } else if (currentStep === 2) {
            showStep(1);
        }
    });

    document.getElementById('rank-select').addEventListener('change', () => {
        updatePowerCount();
        const rank = parseInt(document.getElementById('rank-select').value, 10);
        if (!isNaN(rank)) {
            powerData.initializeTraitsDropdowns(rank);
        }
    });

    document.getElementById('unselect-all-button').addEventListener('click', () => {
        powerData.unselectAllPowers();
    });

    document.getElementById('special-training-checkbox').addEventListener('change', () => powerData.toggleSpecialTraining());

    showStep(0); // Initialize to step 0
    document.getElementById('searchInput').style.display = 'none'; // Hide search bar initially

    powerData.initializePowersetDropdowns();
    powerData.initializeTraitsDropdowns();
});

const CHARACTER_STEPS = {
    BASICS: 1, // Rank, Occupation, Background
    ABILITIES: 2,
    POWERS: 3,
    REVIEW: 4
};

let currentStep = CHARACTER_STEPS.BASICS;

let characterData = {
    rank: 0,
    origin: '',  // Add origin field
    occupation: '',
    background: '',
    abilities: {
        melee: 0,
        agility: 0,
        resilience: 0,
        vigilance: 0,
        ego: 0,
        logic: 0
    },
    abilityPoints: 0,
    powers: [],
    maxPowers: 0,
    powerPoints: 0 // Points from leftover ability points
};

// Initialize the builder
function initializeCharacterBuilder() {
    setupRankSection();
    setupOriginSection();  // Add this line
    setupOccupationSection();
    setupAbilitiesSection();
    setupPowersSection();
    setupNavigationButtons();
    showCurrentStep();
}

// Rank Section
function setupRankSection() {
    document.getElementById('charRank').addEventListener('change', (e) => {
        const rank = parseInt(e.target.value);
        characterData.rank = rank;
        characterData.abilityPoints = 5 * rank;
        characterData.maxPowers = 4 * rank;
        updateAbilityLimits();
        updateCharacterPreview();
    });
}

function updateAbilityLimits() {
    const maxScore = characterData.rank + 3;
    document.querySelectorAll('.ability-input').forEach(input => {
        input.max = maxScore;
    });
}

// Add origin setup function
function setupOriginSection() {
    document.getElementById('origin').addEventListener('change', (e) => {
        characterData.origin = e.target.value;
        updateCharacterPreview();
    });
}

// Occupation Section
function setupOccupationSection() {
    document.getElementById('occupation').addEventListener('change', (e) => {
        characterData.occupation = e.target.value;
        updateOccupationDescription(e.target.value);
        updateCharacterPreview();
    });
}

// Abilities Section
function setupAbilitiesSection() {
    const abilityInputs = document.querySelectorAll('.ability-input');
    abilityInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const ability = e.target.id;
            const value = parseInt(e.target.value);
            updateAbilityScore(ability, value);
        });
    });
}

function updateAbilityScore(ability, newValue) {
    const oldValue = characterData.abilities[ability];
    const pointChange = newValue - oldValue;
    const maxScore = characterData.rank + 3;

    if (newValue > maxScore) {
        document.getElementById(ability).value = maxScore;
        return false;
    }

    if (characterData.abilityPoints - pointChange < 0) {
        document.getElementById(ability).value = oldValue;
        return false;
    }

    characterData.abilities[ability] = newValue;
    characterData.abilityPoints -= pointChange;
    document.getElementById('pointsRemaining').textContent = characterData.abilityPoints;
    updateCharacterPreview();
}

// Powers Section
function setupPowersSection() {
    loadAvailablePowers();
    document.getElementById('powerSelect').addEventListener('change', (e) => {
        const selectedPowers = Array.from(e.target.selectedOptions).map(opt => opt.value);
        if (selectedPowers.length > characterData.maxPowers) {
            alert(`You can only select ${characterData.maxPowers} powers at rank ${characterData.rank}`);
            e.preventDefault();
            return;
        }
        characterData.powers = selectedPowers;
        document.getElementById('powersCount').textContent = 
            `${selectedPowers.length}/${characterData.maxPowers}`;
        updateCharacterPreview();
    });
}

function loadAvailablePowers() {
    fetch("data.tsv")
        .then(response => response.text())
        .then(data => {
            const powers = parsePowersFromTSV(data);
            populatePowerSelect(powers);
        });
}

function parsePowersFromTSV(tsvData) {
    const rows = tsvData.split("\n").filter(row => row.trim());
    const header = rows[0].split("\t");
    return rows.slice(1).map(row => {
        const columns = row.split("\t");
        return {
            name: columns[0],
            description: columns[1],
            powerSet: columns[2],
            rank: parseInt(columns[10])
        };
    });
}

function populatePowerSelect(powers) {
    const powerSelect = document.getElementById('powerSelect');
    powerSelect.innerHTML = '';
    
    const powersBySet = powers.reduce((acc, power) => {
        if (!acc[power.powerSet]) acc[power.powerSet] = [];
        if (power.rank <= characterData.rank) {
            acc[power.powerSet].push(power);
        }
        return acc;
    }, {});

    Object.entries(powersBySet).forEach(([setName, setPowers]) => {
        const group = document.createElement('optgroup');
        group.label = setName;
        
        setPowers.forEach(power => {
            const option = document.createElement('option');
            option.value = power.name;
            option.textContent = `${power.name} (Rank ${power.rank})`;
            option.title = power.description;
            group.appendChild(option);
        });
        
        powerSelect.appendChild(group);
    });
}

// Navigation
function setupNavigationButtons() {
    const prevBtn = document.getElementById('prevStep');
    const nextBtn = document.getElementById('nextStep');

    prevBtn.addEventListener('click', () => {
        if (currentStep > CHARACTER_STEPS.BASICS) {
            currentStep--;
            showCurrentStep();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (validateCurrentStep()) {
            if (currentStep < CHARACTER_STEPS.REVIEW) {
                currentStep++;
                showCurrentStep();
            }
        }
    });

    // Initial state
    prevBtn.disabled = currentStep === CHARACTER_STEPS.BASICS;
    nextBtn.disabled = currentStep === CHARACTER_STEPS.REVIEW;
}

// Update validation
function validateCurrentStep() {
    switch(currentStep) {
        case CHARACTER_STEPS.BASICS:
            if (!characterData.rank || !characterData.origin || !characterData.occupation) {
                alert('Please complete all basic information');
                return false;
            }
            return true;
        
        case CHARACTER_STEPS.ABILITIES:
            if (characterData.abilityPoints < 0) {
                alert('You have used too many ability points');
                return false;
            }
            // Store leftover points
            characterData.powerPoints = characterData.abilityPoints;
            return true;
            
        case CHARACTER_STEPS.POWERS:
            if (characterData.powers.length > characterData.maxPowers) {
                alert(`You can only select ${characterData.maxPowers} powers`);
                return false;
            }
            return true;
            
        case CHARACTER_STEPS.REVIEW:
            return true;
            
        default:
            return false;
    }
}

function updateCharacterPreview() {
    const preview = document.getElementById('review-section');
    preview.innerHTML = `
        <h3>Character Summary</h3>
        <div class="preview-card">
            <h4>Rank: ${characterData.rank}</h4>
            <h4>Origin: ${characterData.origin}</h4>
            <h4>Occupation: ${characterData.occupation}</h4>
            <h4>Background: ${characterData.background}</h4>
            <h4>Abilities:</h4>
            <ul>
                ${Object.entries(characterData.abilities)
                    .map(([name, value]) => `<li>${name}: ${value}/${characterData.rank + 3}</li>`)
                    .join('')}
            </ul>
            <h4>Powers (${characterData.powers.length}/${characterData.maxPowers}):</h4>
            <ul>
                ${characterData.powers.map(power => `<li>${power}</li>`).join('')}
            </ul>
            <p>Ability Points Remaining: ${characterData.abilityPoints}</p>
            <p>Power Points from Abilities: ${characterData.powerPoints}</p>
        </div>
    `;
}

// Update HTML for background selection
const backgroundHtml = `
<div class="background-section">
    <h3>Choose Your Background</h3>
    <select id="background" required>
        <option value="">Select Background</option>
        <option value="Alien">Alien</option>
        <option value="Mutant">Mutant</option>
        <option value="Science Accident">Science Accident</option>
        <option value="Tech Genius">Tech Genius</option>
        <option value="Mystic">Mystic</option>
    </select>
    <p id="backgroundDescription" class="background-description"></p>
</div>`;

// Add to list.html after occupation section

// Fix showCurrentStep function
function showCurrentStep() {
    // Hide all sections
    document.querySelectorAll('.form-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show relevant sections
    const sections = {
        [CHARACTER_STEPS.BASICS]: ['rank-section', 'origin-section', 'occupation-section'],
        [CHARACTER_STEPS.ABILITIES]: ['abilities-section'],
        [CHARACTER_STEPS.POWERS]: ['powers-section'],
        [CHARACTER_STEPS.REVIEW]: ['review-section']
    };

    sections[currentStep].forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
        }
    });

    // Update progress bar
    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.getAttribute('data-step'));
        step.classList.toggle('active', stepNum === currentStep);
        step.classList.toggle('completed', stepNum < currentStep);
    });
}

// Add progress bar update
function updateProgressBar() {
    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.getAttribute('data-step'));
        if (stepNum === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else if (stepNum < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initializeCharacterBuilder);
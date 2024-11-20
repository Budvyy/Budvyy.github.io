let characterData = {
    name: '',
    description: '',
    rank: 1,
    occupation: '',
    abilities: {
        melee: 0,
        agility: 0,
        resilience: 0,
        vigilance: 0,
        ego: 0,
        logic: 0
    },
    powers: [],
    currentPoints: 45,
    maxPowers: 4 // Default for rank 1
};

const occupationDescriptions = {
    "Accountant": "Financial expert skilled in managing resources and analyzing data. +1 to Logic checks involving mathematics or economics.",
    "Artist": "Creative professional with keen eye for detail. +1 to Ego checks involving artistic expression or perception.",
    "Athlete": "Professional sports player with peak physical condition. +1 to Agility checks involving physical activities.",
    "Doctor": "Medical professional with extensive knowledge of human anatomy. +1 to Logic checks involving medicine or biology.",
    "Engineer": "Technical expert skilled in building and fixing things. +1 to Logic checks involving technology or construction.",
    "Journalist": "Information gatherer and storyteller. +1 to Vigilance checks involving investigation.",
    "Law Enforcement": "Trained in upholding the law and protecting citizens. +1 to Vigilance checks involving crime scenes.",
    "Lawyer": "Legal expert skilled in argument and negotiation. +1 to Ego checks involving persuasion.",
    "Military": "Trained soldier with combat experience. +1 to Melee checks involving tactical situations.",
    "Scientist": "Academic researcher pushing the boundaries of knowledge. +1 to Logic checks involving scientific analysis.",
    "Student": "Currently learning and adaptable to new situations. +1 to Logic checks involving studying or learning.",
    "Teacher": "Educator skilled in explaining complex concepts. +1 to Ego checks involving instruction.",
    "Vigilante": "Self-appointed protector operating outside the law. +1 to Vigilance checks involving street knowledge."
};

const CHARACTER_STEPS = {
    RANK: 1,
    OCCUPATION: 2,
    ABILITIES: 3,
    POWERS: 4,
    REVIEW: 5
};

let currentStep = CHARACTER_STEPS.RANK;

// Initialize the character builder
function initializeCharacterBuilder() {
    showCurrentStep();
    setupNavigationButtons();
    setupStepValidation();
    loadAvailablePowers();
}

function showCurrentStep() {
    // Hide all sections
    document.querySelectorAll('.form-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show current section
    const stepMap = {
        [CHARACTER_STEPS.RANK]: 'rank-section',
        [CHARACTER_STEPS.OCCUPATION]: 'occupation-section',
        [CHARACTER_STEPS.ABILITIES]: 'abilities-section',
        [CHARACTER_STEPS.POWERS]: 'powers-section',
        [CHARACTER_STEPS.REVIEW]: 'review-section'
    };

    document.getElementById(stepMap[currentStep]).style.display = 'block';
    updateProgressIndicator();
}

function setupNavigationButtons() {
    const prevBtn = document.getElementById('prevStep');
    const nextBtn = document.getElementById('nextStep');

    prevBtn.addEventListener('click', () => {
        if (currentStep > CHARACTER_STEPS.RANK) {
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
}

function updateProgressIndicator() {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'completed');
        if (parseInt(step.dataset.step) < currentStep) {
            step.classList.add('completed');
        } else if (parseInt(step.dataset.step) === currentStep) {
            step.classList.add('active');
        }
    });
}

function validateCurrentStep() {
    // Add validation logic for each step
    return true;
}

// Update ability scores and check point allocation
function updateAbilityScores(ability, value) {
    const oldValue = characterData.abilities[ability] || 0;
    const pointChange = value - oldValue;
    
    if (characterData.currentPoints - pointChange < 0) {
        alert('Not enough points available!');
        return false;
    }
    
    characterData.abilities[ability] = value;
    characterData.currentPoints -= pointChange;
    
    updatePointsDisplay();
    validateCharacter();
}

// Load available powers based on rank
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
    powerSelect.innerHTML = ''; // Clear existing options
    
    // Group powers by rank
    const powersByRank = powers.reduce((acc, power) => {
        if (!acc[power.rank]) acc[power.rank] = [];
        acc[power.rank].push(power);
        return acc;
    }, {});

    // Create option groups by rank
    Object.keys(powersByRank).sort((a, b) => a - b).forEach(rank => {
        const group = document.createElement('optgroup');
        group.label = `Rank ${rank} Powers`;
        
        powersByRank[rank].forEach(power => {
            const option = document.createElement('option');
            option.value = power.name;
            option.dataset.rank = power.rank;
            option.dataset.powerSet = power.powerSet;
            option.textContent = `${power.name} (${power.powerSet})`;
            option.title = power.description;
            group.appendChild(option);
        });
        
        powerSelect.appendChild(group);
    });
}

// Update character preview
function updateCharacterPreview() {
    document.getElementById('previewName').textContent = characterData.name;
    document.getElementById('previewDescription').textContent = characterData.description;
    
    const powersList = document.getElementById('previewPowers');
    powersList.innerHTML = '';
    characterData.powers.forEach(power => {
        const li = document.createElement('li');
        li.textContent = power;
        powersList.appendChild(li);
    });
}

// Save character
function saveCharacter() {
    const savedCharacters = JSON.parse(localStorage.getItem('marvelCharacters') || '[]');
    savedCharacters.push(characterData);
    localStorage.setItem('marvelCharacters', JSON.stringify(savedCharacters));
    
    alert('Character saved!');
}

function updateOccupationDescription(occupation) {
    const descriptionElement = document.getElementById('occupationDescription');
    descriptionElement.textContent = occupationDescriptions[occupation] || '';
}

// Event Listeners
document.getElementById('charRank').addEventListener('change', (e) => {
    characterData.rank = parseInt(e.target.value);
    characterData.maxPowers = characterData.rank * 4;
    document.getElementById('powersCount').textContent = `0/${characterData.maxPowers}`;
    updateCharacterPreview();
});

document.getElementById('occupation').addEventListener('change', (e) => {
    characterData.occupation = e.target.value;
    updateOccupationDescription(e.target.value);
    updateCharacterPreview();
});

document.getElementById('powerSelect').addEventListener('change', (e) => {
    const selectedPowers = Array.from(e.target.selectedOptions).map(opt => opt.value);
    if (selectedPowers.length > characterData.maxPowers) {
        alert(`You can only select ${characterData.maxPowers} powers at rank ${characterData.rank}`);
        e.preventDefault();
        return;
    }
    characterData.powers = selectedPowers;
    updateCharacterPreview();
});

initializeCharacterBuilder();
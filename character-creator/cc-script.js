let currentStep = 0;

function showStep(step) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((stepElement, index) => {
        stepElement.style.display = index === step ? 'block' : 'none';
    });
    document.getElementById('backBtn').style.display = step === 0 ? 'none' : 'inline';
}

function nextStep() {
    const steps = document.querySelectorAll('.step');
    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

document.getElementById('nextBtn').addEventListener('click', nextStep);
document.getElementById('backBtn').addEventListener('click', prevStep);

// Initialize the first step
showStep(currentStep);

function updateDescription(selectElement, dataObject, descriptionId) {
    const selected = selectElement.value;
    const descriptionElement = document.getElementById(descriptionId);
    
    if (selected && dataObject[selected]) {
        descriptionElement.textContent = dataObject[selected].description;
        
        // Update traits
        const traitsListId = descriptionId.replace('Description', 'Traits');
        const traitsList = document.getElementById(traitsListId);
        if (traitsList && dataObject[selected].traits) {
            traitsList.innerHTML = dataObject[selected].traits
                .map(trait => `<li>${trait}</li>`)
                .join('');
        }
        
        // Update powers
        const powersListId = descriptionId.replace('Description', 'Powers');
        const powersList = document.getElementById(powersListId);
        if (powersList && dataObject[selected].powers) {
            powersList.innerHTML = dataObject[selected].powers
                .map(power => `<li>${power}</li>`)
                .join('');
        }
    } else {
        descriptionElement.textContent = "";
        // Clear traits and powers
        const traitsList = document.getElementById(descriptionId.replace('Description', 'Traits'));
        const powersList = document.getElementById(descriptionId.replace('Description', 'Powers'));
        if (traitsList) traitsList.innerHTML = "";
        if (powersList) powersList.innerHTML = "";
    }
}

function updateSubOrigins(originSelect) {
    const selected = originSelect.value;
    const subOriginContainer = document.getElementById('subOriginContainer');
    
    if (originData[selected]?.subOrigins) {
        const subOrigins = originData[selected].subOrigins;
        const subOriginSelect = document.createElement('select');
        subOriginSelect.id = 'subOrigin';
        subOriginSelect.className = 'form-control';
        
        // Add default option
        subOriginSelect.innerHTML = '<option value="" disabled selected>Select a sub-origin</option>';
        
        Object.entries(subOrigins).forEach(([key, description]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            option.title = description;
            subOriginSelect.appendChild(option);
        });
        
        subOriginContainer.innerHTML = `
            <div class="form-group">
                <label for="subOrigin">Sub-Origin:</label>
                <p class="form-description">Select a specific type of ${selected}</p>
                ${subOriginSelect.outerHTML}
                <p id="subOriginDescription" class="item-description"></p>
                <div id="subOriginPowersContainer">
                    <p class="list-header">Powers:</p>
                    <ul id="subOriginPowers" class="powers-list"></ul>
                </div>
            </div>
        `;
        
        document.getElementById('subOrigin').addEventListener('change', function() {
            const subOriginData = originData[selected].subOrigins[this.value];
            document.getElementById('subOriginDescription').textContent = subOriginData.description || subOriginData;
            
            // Update powers if they exist
            const powersList = document.getElementById('subOriginPowers');
            if (powersList && subOriginData.powers) {
                powersList.innerHTML = subOriginData.powers
                    .map(power => `<li>${power}</li>`)
                    .join('');
            } else if (powersList) {
                powersList.innerHTML = '';
            }
            
            updateCharacterData('subOrigin', this.value);
        });
    } else {
        subOriginContainer.innerHTML = '';
        characterData.subOrigin = null;
    }
}

// Event listeners for dropdowns
document.getElementById('origin').addEventListener('change', function() {
    updateDescription(this, originData, 'originDescription');
    updateSubOrigins(this);
});

document.getElementById('occupation').addEventListener('change', function() {
    updateDescription(this, occupationData, 'occupationDescription');
});

// Character data storage
let characterData = {
    origin: null,
    subOrigin: null,
    occupation: null
};

// Store selections
function updateCharacterData(field, value) {
    characterData[field] = value;
    console.log('Character Data:', characterData);
}

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
        const data = dataObject[selected];
        descriptionElement.innerHTML = `
            <p>${data.description}</p>
            ${data.examples ? `<p><strong>Examples:</strong> ${data.examples.join(', ')}</p>` : ''}
            ${data.tags ? `<p><strong>Tags:</strong> ${data.tags.join(', ')}</p>` : ''}
            ${data.traits ? `<p><strong>Traits:</strong> ${data.traits.join(', ')}</p>` : ''}
            ${data.powers ? `<p><strong>Powers:</strong> ${data.powers.join(', ')}</p>` : ''}
            ${data.suggestedOccupation ? `<p><strong>Suggested Occupation:</strong> ${data.suggestedOccupation}</p>` : ''}
        `;
        
        // Update traits
        const traitsListId = descriptionId.replace('Description', 'Traits');
        const traitsList = document.getElementById(traitsListId);
        if (traitsList && data.traits) {
            traitsList.innerHTML = data.traits
                .map(trait => `<li>${trait}</li>`)
                .join('');
        }
        
        // Update powers
        const powersListId = descriptionId.replace('Description', 'Powers');
        const powersList = document.getElementById(powersListId);
        if (powersList && data.powers) {
            powersList.innerHTML = data.powers
                .map(power => `<li>${power}</li>`)
                .join('');
        }
    } else {
        descriptionElement.innerHTML = "";
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

function limitAttributePoints() {
    const rankSelect = document.querySelector('.rank');
    const rank = parseInt(rankSelect.value);
    const maxPoints = rank * 5;
    const maxAttributeValue = rank + 3;
    const attributes = document.querySelectorAll('.attribute-group input');
    let totalPoints = 0;

    attributes.forEach(attr => {
        totalPoints += parseInt(attr.value);
        attr.max = maxAttributeValue;
    });

    if (totalPoints > maxPoints) {
        alert(`You have exceeded the maximum points limit of ${maxPoints}.`);
        attributes.forEach(attr => {
            attr.value = newValue >= 0 ? newValue : 0;
        });

    
    }

    const pointsLeft = maxPoints - totalPoints;
    document.getElementById('pointsLeft').textContent = `Points left: ${pointsLeft >= 0 ? pointsLeft : 0}`;
    document.getElementById('pointCap').textContent = `Point Cap: ${maxAttributeValue}`;
}

document.querySelectorAll('.attribute-group input').forEach(input => {
    input.addEventListener('input', limitAttributePoints);
});

function displayRankDetails(rank) {
    const rankDetails = document.getElementById('rankDetails');
    const attributePoints = rank * 5;
    const powers = rank * 4;
    const traits = rank;
    rankDetails.innerHTML = `
        <p>Attribute Points: ${attributePoints}</p>
        <p>Powers: ${powers}</p>
        <p>Traits: ${traits}</p>
    `;
}

document.querySelector('.rank').addEventListener('change', function() {
    const rank = parseInt(this.value);
    displayRankDetails(rank);
    limitAttributePoints();
});

document.addEventListener('DOMContentLoaded', () => {
    limitAttributePoints();
    const rank = parseInt(document.querySelector('.rank').value);
    displayRankDetails(rank);
});

function enableNextPowerDropdown(currentDropdown) {
    const nextDropdown = currentDropdown.nextElementSibling;
    if (nextDropdown && nextDropdown.tagName === 'SELECT') {
        nextDropdown.disabled = false;
    }
}

function updatePowerOptions() {
    const selectedPowers = new Set();
    document.querySelectorAll('#powerSelections select').forEach(select => {
        if (select.value) {
            selectedPowers.add(select.value);
        }
    });

    document.querySelectorAll('#powerSelections select').forEach(select => {
        const options = select.querySelectorAll('option');
        options.forEach(option => {
            if (selectedPowers.has(option.value) && option.value !== select.value) {
                option.disabled = true;
            } else {
                option.disabled = false;
            }
        });
    });
}

document.querySelectorAll('#powerSelections select').forEach((select, index) => {
    select.addEventListener('change', function() {
        if (this.value) {
            enableNextPowerDropdown(this);
        }
        updatePowerOptions();
    });
    if (index !== 0) {
        select.disabled = true;
    }
});

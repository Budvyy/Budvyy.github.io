document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const sections = document.querySelectorAll('.form-section');
    const nextButton = document.getElementById('nextStep');
    const prevButton = document.getElementById('prevStep');
    const rankSelect = document.getElementById('charRank');
    const occupationSelect = document.getElementById('occupation');
    const pointsRemaining = document.getElementById('pointsRemaining');
    const abilityInputs = document.querySelectorAll('.ability-input');
    const powerSelect = document.getElementById('powerSelect');
    const powersetSelect = document.getElementById('powersetSelect');
    const powersCount = document.getElementById('powersCount');
    const previewName = document.getElementById('previewName');
    const previewDescription = document.getElementById('previewDescription');
    const previewPowers = document.getElementById('previewPowers');
    const previewAbilities = document.getElementById('previewAbilities');
    const previewRank = document.getElementById('previewRank');
    const previewOccupation = document.getElementById('previewOccupation');

    let currentStep = 0;
    let totalPoints = 10;
    let selectedPowers = [];
    let allPowers = [];

    function updateStep() {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });
        sections.forEach((section, index) => {
            section.style.display = index === currentStep ? 'block' : 'none';
        });
        prevButton.style.display = currentStep === 0 ? 'none' : 'inline-block';
        nextButton.textContent = currentStep === steps.length - 1 ? 'Finish' : 'Next';
    }

    function updatePoints() {
        let usedPoints = 0;
        abilityInputs.forEach(input => {
            usedPoints += parseInt(input.value, 10);
        });
        pointsRemaining.textContent = totalPoints - usedPoints;
    }

    function updatePowersCount() {
        const rank = parseInt(rankSelect.value, 10);
        const maxPowers = rank ? rank * 4 : 0;
        powersCount.textContent = `${selectedPowers.length}/${maxPowers}`;
    }

    function updatePreview() {
        previewRank.textContent = `Rank: ${rankSelect.value}`;
        previewOccupation.textContent = `Occupation: ${occupationSelect.value}`;
        previewAbilities.innerHTML = '';
        abilityInputs.forEach(input => {
            const ability = document.createElement('p');
            ability.textContent = `${input.previousElementSibling.textContent} ${input.value}`;
            previewAbilities.appendChild(ability);
        });
        previewPowers.innerHTML = '';
        selectedPowers.forEach(power => {
            const li = document.createElement('li');
            li.textContent = power;
            previewPowers.appendChild(li);
        });
    }

    nextButton.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateStep();
        } else {
            updatePreview();
            alert('Character creation complete!');
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateStep();
        }
    });

    rankSelect.addEventListener('change', updatePowersCount);
    abilityInputs.forEach(input => {
        input.addEventListener('input', updatePoints);
    });

    powerSelect.addEventListener('change', () => {
        selectedPowers = Array.from(powerSelect.selectedOptions).map(option => option.textContent);
        updatePowersCount();
    });

    powersetSelect.addEventListener('change', () => {
        const selectedPowersets = Array.from(powersetSelect.selectedOptions).map(option => option.value);
        populatePowers(allPowers, selectedPowersets);
    });

    function populatePowers(tsvData, selectedPowersets = []) {
        const rows = tsvData.split("\n").filter(row => row.trim());
        const header = rows[0].split("\t");
        const data = rows.slice(1).map(row => row.split("\t"));

        powerSelect.innerHTML = ''; // Clear previous options

        const filteredData = data.filter(row => selectedPowersets.length === 0 || selectedPowersets.includes(row[header.indexOf("Power Set")]));

        filteredData.sort((a, b) => a[header.indexOf("Power")].localeCompare(b[header.indexOf("Power")]));

        filteredData.forEach(row => {
            const powerName = row[header.indexOf("Power")];
            const option = document.createElement("option");
            option.textContent = powerName;
            powerSelect.appendChild(option);
        });
    }

    fetch("data.tsv")
        .then(response => response.text())
        .then(tsvData => {
            allPowers = tsvData;
            populatePowers(tsvData);
        })
        .catch(err => console.error("Error loading TSV file:", err));

    updateStep();
    updatePoints();
    updatePowersCount();
});
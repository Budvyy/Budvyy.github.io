document.addEventListener('DOMContentLoaded', () => {
    fetch('powers.tsv')
        .then(response => response.text())
        .then(data => {
            const powers = parseTSV(data);
            powers.sort((a, b) => a.Power.localeCompare(b.Power));
            displayPowers(powers);
        });

    const availablePowersList = document.getElementById('available-powers');
    const selectedPowersList = document.getElementById('selected-powers');
    const powerDescription = document.getElementById('power-description');
    let powersMap = {};
    let selectedPowers = new Set();

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
        powers.forEach(power => {
            powersMap[power['Power']] = power;
        });
        return powers;
    }

    function displayPowers(powers) {
        clearList(availablePowersList);
        powers.forEach(power => {
            const li = document.createElement('li');
            li.textContent = power['Power'];
            li.addEventListener('mouseover', () => {
                displayPowerDetails(power);
            });
            li.addEventListener('click', () => {
                addPowerToSelected(power, li);
            });
            availablePowersList.appendChild(li);
        });
    }

    function sortAndDisplayLists() {
        // Sort and redisplay available powers
        const availablePowers = Array.from(availablePowersList.children);
        availablePowers.sort((a, b) => a.textContent.localeCompare(b.textContent));
        clearList(availablePowersList);
        availablePowers.forEach(li => availablePowersList.appendChild(li));

        // Sort and redisplay selected powers
        const selectedPowerElements = Array.from(selectedPowersList.children);
        selectedPowerElements.sort((a, b) => a.textContent.localeCompare(b.textContent));
        clearList(selectedPowersList);
        selectedPowerElements.forEach(li => selectedPowersList.appendChild(li));
    }

    function clearList(list) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }

    function displayPowerDetails(power) {
        powerDescription.innerHTML = '';
        for (const key in power) {
            const li = document.createElement('li');
            li.textContent = `${key}: ${power[key]}`;
            powerDescription.appendChild(li);
        }
    }

    function addPowerToSelected(power, li) {
        if (selectedPowers.has(power['Power'])) return;

        selectedPowers.add(power['Power']);
        const selectedLi = document.createElement('li');
        selectedLi.textContent = power['Power'];
        selectedLi.addEventListener('mouseover', () => {
            displayPowerDetails(power);
        });
        selectedLi.addEventListener('click', () => {
            removePowerFromSelected(power, selectedLi);
        });
        selectedPowersList.appendChild(selectedLi);

        // Remove from available powers list
        availablePowersList.removeChild(li);

        // Add prerequisite powers
        if (power['Prerequisites']) {
            const prerequisites = power['Prerequisites'].split(', ');
            prerequisites.forEach(prerequisite => {
                if (powersMap[prerequisite]) {
                    const prereqLi = Array.from(availablePowersList.children)
                        .find(li => li.textContent === prerequisite);
                    if (prereqLi) {
                        addPowerToSelected(powersMap[prerequisite], prereqLi);
                    }
                }
            });
        }

        sortAndDisplayLists();
    }

    function removePowerFromSelected(power, li) {
        // Remove dependent powers first
        const dependentPowers = Array.from(selectedPowersList.children).filter(powerLi => {
            const powerObj = powersMap[powerLi.textContent];
            return powerObj.Prerequisites && 
                   powerObj.Prerequisites.split(', ').includes(power['Power']);
        });

        // Remove each dependent power
        dependentPowers.forEach(depLi => {
            const depPower = powersMap[depLi.textContent];
            removePowerFromSelected(depPower, depLi);
        });

        // Remove the power itself
        selectedPowers.delete(power['Power']);
        selectedPowersList.removeChild(li);

        // Add back to available powers list
        const availableLi = document.createElement('li');
        availableLi.textContent = power['Power'];
        availableLi.addEventListener('mouseover', () => {
            displayPowerDetails(power);
        });
        availableLi.addEventListener('click', () => {
            addPowerToSelected(power, availableLi);
        });
        availablePowersList.appendChild(availableLi);

        sortAndDisplayLists();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let stats = {
        strength: 0,
        wisdom: 0,
        charisma: 0,
        health: 100,
        mana: 50
    };

    // Load saved stats
    if (localStorage.getItem('stats')) {
        stats = JSON.parse(localStorage.getItem('stats'));
        updateUI();
        checkAchievements(); // Check achievements on load
    }

    // Automatically increase stats
    setInterval(() => {
        stats.strength += 1;
        stats.wisdom += 1;
        stats.charisma += 1;
        updateUI();
        saveGame();
    }, 1000);

    // Train button
    document.getElementById('train').addEventListener('click', () => {
        stats.strength += 10;
        stats.wisdom += 10;
        stats.charisma += 10;
        updateUI();
        checkAchievements(); // Check achievements on train
        saveGame();
    });

    // Challenge button
    document.getElementById('faceChallenge').addEventListener('click', () => {
        if (Math.random() < 0.5) {
            stats.health -= 10;
            document.getElementById('challengeResult').textContent = 'You lost the challenge. Health decreased.';
        } else {
            stats.health += 20;
            stats.mana += 10;
            document.getElementById('challengeResult').textContent = 'You won the challenge. Health and Mana increased!';
        }
        updateUI();
        checkAchievements(); // Check achievements on challenge
        saveGame();
    });

    function updateUI() {
        document.getElementById('strength').textContent = stats.strength;
        document.getElementById('wisdom').textContent = stats.wisdom;
        document.getElementById('charisma').textContent = stats.charisma;
        document.getElementById('health').textContent = stats.health;
        document.getElementById('mana').textContent = stats.mana;
    }

    function saveGame() {
        localStorage.setItem('stats', JSON.stringify(stats));
    }

    function checkAchievements() {
        const achievementsElement = document.getElementById('achievements');
        achievementsElement.innerHTML = ''; // Clear current achievements
        
        const achievements = [
            { id: "strength50", condition: () => stats.strength > 50, text: "Strength Over 50" },
            { id: "wisdom50", condition: () => stats.wisdom > 50, text: "Wisdom Over 50" },
            { id: "charisma50", condition: () => stats.charisma > 50, text: "Charisma Over 50" },
            { id: "health150", condition: () => stats.health > 150, text: "Health Over 150" },
            { id: "mana100", condition: () => stats.mana > 100, text: "Mana Over 100" },
            // Add more achievements here...
            { id: "strength100", condition: () => stats.strength > 100, text: "Strength Over 100" },
            { id: "wisdom100", condition: () => stats.wisdom > 100, text: "Wisdom Over 100" },
            { id: "charisma100", condition: () => stats.charisma > 100, text: "Charisma Over 100" },
            { id: "firstChallenge", condition: () => stats.health < 100 || stats.mana > 50, text: "Faced Your First Challenge" },
            { id: "health200", condition: () => stats.health > 200, text: "Health Over 200" },
            // Ensure you have 15 achievements here
            // This template can be expanded to include more detailed and complex achievements
        ];

        achievements.forEach(achievement => {
            if (achievement.condition()) {
                achievementsElement.innerHTML += `<li>${achievement.text}</li>`;
            }
        });
    }
});

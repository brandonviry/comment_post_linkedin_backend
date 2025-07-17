// This file shows how to make a request to the /generate-comment endpoint.

async function testGenerateComment() {
    try {
        const response = await fetch('http://localhost:3001/api/generate-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: `Tu veux éviter de réinventer la roue pour une carte interactive ?

Voici 4 plugins Leaflet qui m’ont fait gagner des jours de dev.
Installés en 1 ligne, adoptés à vie.

Leaflet.prunecluster
→ Clusterise automatiquement des milliers de points
→ Sans ça, bon courage pour afficher une base d’adresses sans freeze

Leaflet.Control.MiniMap
→ Ajoute une mini-carte de repérage dans un coin
→ Très utile pour les cartes avec beaucoup de navigation ou de zoom

Leaflet.geoman
→ Permet de dessiner sur la carte avec une interface fluide
→ Contrôles avancés, événements bien gérés, parfait pour les applis métier

Leaflet.locatecontrol
→ Ajoute un bouton de géolocalisation utilisateur, façon Google Maps
→ Petit détail, gros confort sur mobile

Je les utilise sur quasiment tous mes projets Leaflet.
Résultat : moins de code, moins de bugs, et une meilleure UX.

Et vous, vous en avez d’autres à recommander ? 
Je suis toujours preneur de bonnes trouvailles. 👇🏾`,
                imageUrls: ["https://media.licdn.com/dms/image/v2/D4D22AQFX75zmyjeOHg/feedshare-shrink_800/B4DZgSJEA4GsAk-/0/1752651023692?e=1755734400&v=beta&t=zbrmytPBbvljBBvzNDKYCAz35LT51XJHKWh8o-ShsfA"],
                apiKey: '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', // IMPORTANT: Replace with your actual key
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }

        const data = await response.json();
        console.log('Generated Comment:', data.content);

    } catch (error) {
        console.error('Error sending request:', error.message);
    }
}

testGenerateComment();

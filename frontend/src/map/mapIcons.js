// Configura os ícones e cores para os marcadores
const coresReciclagem = {
    "Eletrônico": "blue",
    "Orgânico": "green",
    "Metal": "orange",
    "Químico": "red",
    "Papel": "yellow",
    "Plástico": "purple",
    "Vidro": "cyan"
};

const iconesReciclagem = {
    "Eletrônico": {
        iconUrl: "../../public/images/laptop-screen.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    },
    "Orgânico": {
        iconUrl: "../../public/images/food.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    },
    "Metal": {
        iconUrl: "../../public/images/beam.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    },
    "Químico": {
        iconUrl: "../../public/images/needle.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    },
    "Papel": {
        iconUrl: "../../public/images/paper-plane.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    },
    "Plástico": {
        iconUrl: "../../public/images/water-bottle.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    },
    "Vidro": {
        iconUrl: "../../public/images/glass-bottle.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }
};

export function criarIcone(tipo) {
    return L.icon(iconesReciclagem[tipo] || iconesReciclagem["Orgânico"]);
}

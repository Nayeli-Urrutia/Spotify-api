class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(cancion, prioridad) {
        const newItem = { cancion, prioridad };
        this.items.push(newItem);
        this.items.sort((a, b) => b.prioridad - a.prioridad); // Ordenar de mayor a menor prioridad
    }

    dequeue() {
        if (this.isEmpty()) {
            console.log("La cola está vacía");
            return;
        }
        return this.items.shift().cancion; // Retornar solo la canción
    }

    isEmpty() {
        return this.items.length === 0;
    }

    mostrar() {
        console.log("Canciones en la cola:");
        this.items.forEach((item, index) => {
            console.log(`${index + 1}. ${item.cancion.name} - ${item.cancion.artist} (Prioridad: ${item.prioridad})`);
        });
    }
}

class SpotifyPlayer {
    constructor(accessToken) {
        if (!accessToken) {
            console.error('Token de acceso no proporcionado.');
            return;
        }
        this.accessToken = accessToken;
        this.queue = new PriorityQueue(); // Usar cola de prioridad
    }

    async obtenerCancionesMasEscuchadas() {
        try {
            const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                }
            });
    
            if (!response.ok) {
                throw new Error('Error al obtener las canciones: ' + response.statusText);
            }
    
            const data = await response.json();
            const topTracks = data.items;
    
            topTracks.forEach(track => {
                this.queue.enqueue({
                    name: track.name,
                    artist: track.artists.map(artist => artist.name).join(', '),
                    url: track.external_urls.spotify
                }, 1);
            });
    
            console.log("Canciones obtenidas y añadidas a la cola:");
            this.queue.mostrar();
        } catch (error) {
            console.error('Error al obtener las canciones:', error);
            alert('No se pudieron obtener las canciones. Verifica el token de acceso y los permisos.');
        }
    }

    mostrarListaCanciones() {
        const listaDiv = document.getElementById('listaCanciones');
        listaDiv.innerHTML = ''; // Limpiar lista actual

        // Crear elementos HTML para mostrar las canciones en el div
        this.queue.items.forEach(item => {
            const songElement = document.createElement('div');
            songElement.textContent = `${item.cancion.name} - ${item.cancion.artist} (Prioridad: ${item.prioridad})`;
            listaDiv.appendChild(songElement);
        });
    }

    async reproducirCanciones() {
        while (!this.queue.isEmpty()) {
            const cancion = this.queue.dequeue();
            console.log(`Reproduciendo: ${cancion.name} de ${cancion.artist}`);
            console.log(`Enlace de reproducción: ${cancion.url}`);
            alert(`Reproduciendo: ${cancion.name} de ${cancion.artist}`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa de 2 segundos entre canciones
        }
    }
}
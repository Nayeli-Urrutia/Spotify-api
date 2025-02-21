class SpotifyPlayer {
    constructor(accessToken) {
        // Guardamos el token de acceso proporcionado al instanciar la clase
        if (!accessToken) {
            console.error('Token de acceso no proporcionado.');
            return;
        }
        this.accessToken = accessToken;
        this.items = []; // Cola de canciones
    }

    // Añadir canción a la cola
    enqueue(cancion) {
        this.items.push(cancion);
    }

    // Eliminar y devolver la canción más antigua de la cola
    dequeue() {
        if (this.isEmpty()) {
            console.log("La cola está vacía");
            return;
        }
        return this.items.shift();
    }

    // Verificar si la cola está vacía
    isEmpty() {
        return this.items.length === 0;
    }

    // Mostrar todas las canciones en la cola
    mostrar() {
        console.log("Canciones en la cola:");
        this.items.forEach((cancion, index) => {
            console.log(`${index + 1}. ${cancion.name} - ${cancion.artist}`);
        });
    }

    // Función para obtener las 10 canciones más escuchadas de Spotify
    async obtenerCancionesMasEscuchadas() {
        const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.accessToken}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        const topTracks = data.items;

        // Añadir las canciones a la cola
        topTracks.forEach(track => {
            this.enqueue({
                name: track.name,
                artist: track.artists.map(artist => artist.name).join(', '),
                url: track.external_urls.spotify
            });
        });

        console.log("Canciones obtenidas y añadidas a la cola:");
        this.mostrar();
    }

    // Simula la reproducción de las canciones en orden FIFO
    async reproducirCanciones() {
        while (!this.isEmpty()) {
            const cancion = this.dequeue();
            console.log(`Reproduciendo: ${cancion.name} de ${cancion.artist}`);
            console.log(`Enlace de reproducción: ${cancion.url}`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa de 2 segundos entre canciones
        }
    }
}

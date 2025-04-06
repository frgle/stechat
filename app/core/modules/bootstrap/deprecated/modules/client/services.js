// networkService.js
class ClientService {
  static join(invitation) {
    return fetch(invitation)
      .then(res => {
        if (res.ok) {
          return res.json(); // Retornamos la respuesta como un objeto JSON
        } else {
          throw new Error(`Failed to join with the invitation: ${invitation} ${JSON.stringify(res)}`);
        }
      })
      .catch(error => {
        console.error('Error al unirse:', error);
        return null;
      });
  }

  static ping(url, id, port) {
    return fetch(`${url}/ping/${id}/${port}`)
      .then(res => res.text())
      .catch(err => {
        console.error('Error al hacer ping:', err);
        return null;
      });
  }

  static startPingLoop(url, id, port, interval = 5000) {
    return setInterval(() => {
      this.ping(url, id, port)
        .then(response => console.log('Auto-ping:', response))
        .catch(err => console.error('Error en auto-ping:', err));
    }, interval);
  }
}

module.exports = ClientService;

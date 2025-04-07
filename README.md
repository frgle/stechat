# SteChat

**SteChat** es un proyecto de chat descentralizado que funciona mediante un núcleo central o *daemon core*, encargado de gestionar la lógica de red y la comunicación local entre interfaces. Su arquitectura permite múltiples interfaces (como CLI o GUI) que se comunican con el core a través de la red local, manteniendo una separación clara entre lógica y presentación.

## ¿Cómo funciona?

SteChat se basa en un modelo modular:

- **Daemon Core**: Es el corazón del sistema. Corre como un servicio local que maneja conexiones, mensajes y persistencia. Todas las interfaces se conectan a este core para enviar y recibir mensajes.
  
- **Interfaces Independientes**: Las interfaces (CLI, GUI, etc.) son aplicaciones separadas que interactúan con el core mediante una API local. Esto permite desarrollar nuevas formas de interactuar con el chat sin modificar la lógica base.

- **Sin servidor central**: No existe un servidor central ni punto único de falla. La comunicación se realiza directamente entre nodos en la red local o mediante mecanismos de descubrimiento entre pares.

## Características

- 🔌 **Arquitectura modular**: Separación completa entre backend (core) y frontend (interfaces).
- 🖥️ **Interfaces múltiples**: Inicialmente se incluyen CLI y GUI, con posibilidad de expandir a móviles u otros entornos.
- 🌐 **Descentralización real**: No se depende de servicios externos ni servidores centrales.
- 🛠️ **Extensible**: Fácil de adaptar e integrar nuevas funcionalidades o interfaces.

## Estado del proyecto

Actualmente en fase de rediseño, enfocado en estabilidad, rendimiento local y facilidad de extensión. Elementos como Gun y el servidor Bootstrap fueron eliminados para simplificar y fortalecer la arquitectura.

---

**Nota**: Este proyecto está en desarrollo activo. Se recomienda clonar y ejecutar cada componente por separado, siguiendo la documentación específica de cada interfaz y del daemon core.

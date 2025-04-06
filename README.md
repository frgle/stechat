# SteChat

SteChat es un chat descentralizado basado en tecnología peer-to-peer (P2P) que permite a los usuarios comunicarse de manera directa, sin necesidad de servidores centrales. Utiliza Gun para la comunicación P2P y Express para hostear el servidor bootstrap que ayuda a los nuevos usuarios a unirse a la red de chat específica.

## Descripción

Este proyecto implementa un sistema de chat en el que los usuarios pueden unirse a salas de chat privadas de forma completamente descentralizada. Cada sala de chat tiene un anfitrión que ejecuta un servidor bootstrap local (hosteado en su máquina), que facilita la conexión de los nuevos usuarios a la red P2P de esa sala específica.

## Características principales

### Comunicación P2P: 
La comunicación entre los usuarios se realiza de manera directa, sin necesidad de un servidor central. Usamos Gun, una base de datos descentralizada y en tiempo real.

### Servidor Bootstrap: 
El anfitrión de cada chat ejecuta un servidor bootstrap en su máquina local para permitir que los nuevos usuarios se conecten a la red P2P de ese chat. Este servidor también gestiona los códigos de invitación que los usuarios deben usar para unirse a la red.

### Salas de Chat: 
Las salas de chat son privadas, y el creador o anfitrión tiene control sobre quién puede unirse a la sala mediante un código de invitación. Los usuarios que tengan este código pueden unirse a la red y comenzar a chatear.

## Principales Componentes

### CLI: 
La interfaz de línea de comandos permite a los usuarios interactuar con el chat sin necesidad de una interfaz gráfica. Es ideal para usuarios avanzados o aquellos que prefieren trabajar en un terminal.

### GUI: 
La interfaz gráfica de usuario proporciona una forma visual de interactuar con el chat, lo que lo hace más accesible para un público más amplio. Permite chatear, unirse a la red y gestionar las conexiones P2P de forma intuitiva.

### Bootstrap Server: 
El anfitrión del chat ejecuta un servidor Express que facilita la conexión de nuevos usuarios a la red P2P. Este servidor también se encarga de generar códigos de invitación para cada chat. El código de invitación se utiliza para permitir que los nuevos usuarios se conecten al chat.

### Gun: 
Utilizamos Gun, una base de datos descentralizada, para gestionar la comunicación en tiempo real entre los usuarios. Gun maneja la sincronización de los mensajes y la conexión P2P entre los participantes del chat.


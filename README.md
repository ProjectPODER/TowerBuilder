# TowerBuilder

TowerBuilder es un sistema que no requiere programación para generar sitios web con visualizaciones de datos de contrataciones, especialmente orientado a grandes obras públicas, inspirado por www.torredecontrol.org.

Puedes leer la documentación completa en [el manual de TowerBuilder](https://towerbuilder.readthedocs.io/), donde se explica detalladamente cada paso para crear tu propio sitio web utilizando el sistema.

#### ¿Qué necesito para armar mi sitio con TowerBuilder?
* Conseguir un listado de contrataciones en formato [OCDS](http://standard.open-contracting.org/latest/en/).
* Armar una planilla de cálculo con los dueños de las empresas contratistas.
* Redactar y editar textos en formato [MarkDown](https://www.markdownguide.org/).
* Una cuenta de [GitHub.com](https://github.com/).

#### ¿Qué ventajas tiene usar TowerBuilder para armar mi sitio?
* El diseño predeterminado no requiere ningún esfuerzo de programación ni alojamiento del sitio, se hace todo desde GitHub.com
* Tendrás una visualización de datos impactante y un útil sistema de búsqueda de contratos.
* Si tienes acceso a los datos, podrás armar tu sitio en minutos.
* Podrás personalizar el diseño y los textos todo lo que gustes, de acuerdo a tus conocimientos y el tiempo disponible.
* Podrás utilizar los datos abiertos del gobierno de tu país y demostrar la utilidad del estándar de contrataciones abiertas (OCDS) para el periodismo.

#### ¿Cuáles son los pasos?
1. Bifurcar el repositorio
2. Editar la configuración
3. Agregar los datos
4. Editar los textos
5. Publicar el sitio

Si encuentras algún problema que no se tenga en cuenta en la documentación, o si deseas ayuda para armar tu sitio, puedes ponerte en contacto con PODER a través de la siguiente dirección de e-mail: info@quienesquien.wiki. Alternativamente puedes reportar una incidencia utilizando GitHub, en la siguiente dirección: [https://github.com/ProjectPODER/TowerBuilder/issues](https://github.com/ProjectPODER/TowerBuilder/issues)

### Instalar la versión para desarrollo
Si eres desarrollador y deseas correr TowerBuilder de manera local, estas son las instrucciones:

1. Dentro de la terminal, comenzaremos por clonar el repositorio:
`   git clone https://github.com/ProjectPODER/TowerBuilder.git`

2. Entrar al proyecto:
`   cd TowerBuilder`

3. Dentro de la carpeta, vamos a instalar las dependencias necesarias para el proyecto:
`   bundle install`

 3.1 Si no tienes el comando bundle instalado, significa que no tienes ruby, para esto debes instalar primero ruby, bundle y las cabeceras de desarrollo de ruby con el siguiente comando:
`   sudo apt install ruby ruby-bundler ruby-dev`

4. Para construir el sitio y hacerlo disponible en un servidor local:
`   bundle exec jekyll serve --livereload`

 4.1. Es muy probable que en este punto recibas un error sobre cantidad máxima de archivos que se pueden monitorear en tu sistema, y es muy probable que se arregle como dice en la [documentación](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers):
`   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

5. Ahora navega a http://localhost:4000

#### Pasos siguientes
- Hacer opcional el gráfico de la sección de Visualización.
- Permitir otros tipos de visualizaciones en esta sección.

### Proyectos lanzados

- Living with HIV - [http://livingwithhiv.org/](http://livingwithhiv.org/)

Contáctanos para añadir tu proyecto creado con TowerBuilder a través de la siguiente dirección de e-mail: <info@quienesquien.wiki>.

### Demos
Puedes ver una página de ejemplo en:

Español: <http://es.towerbuilder.projectpoder.org/>

Inglés: <https://towerbuilder.projectpoder.org/>

#### Versiones para iframe

Tower Builder cuenta con versiones que pueden insertarse mediante un iframe en otros sitios web: 

<https://towerbuilder.projectpoder.org/?iframe>.

Iframes para la visualización y el slider:

<https://towerbuilder.projectpoder.org/iframe-visualization/>

<https://towerbuilder.projectpoder.org/iframe-slider/>


### Documentación

En español: <https://towerbuilder.readthedocs.io/es/latest/index.html>

En inglés: <https://towerbuilder.readthedocs.io/en/latest/index.html>


### Soporte multi-dispositivo
Gracias al apoyo de BrowserStack estamos implementando mejoras para soportar múltiples dispositivos, incluso aquellos a los que no tenemos acceso directo, aprovechando la oferta gratuita del servicio de pruebas de BrowserStack.



| [![www.browsertack.org](https://d98b8t1nnulk5.cloudfront.net/production/images/opensource/browserstack-monogram.svg)](https://www.browsertack.org)  [BrowserStack](https://www.browsertack.org) | . |
| --- | --- |


# Editar los textos

Los archivos de texto que se pueden editar, están en formato MarkDown (.md).

Markdown es una sintaxis liviana y fácil de usar para dar estilo a los textos en la web. Tú controlas la visualización del documento; formatear palabras en negrita o cursiva, agregar imágenes y crear listas son solo algunas de las cosas que podemos hacer con Markdown. En general, Markdown es solo texto regular con algunos caracteres no alfabéticos, como `#` o `*`.

Te recomendamos la [guía de Markdown de Github](https://guides.github.com/features/mastering-markdown/) para aprender más al respecto.

## Textos principales

Los textos principales están conformados por las secciones que aparecen en el menú principal.

Para editar los archivos:

1. En el repositorio en Github, dar click en el archivo que se quiere modificar.
2. Dentro del archivo, dar click en el ícono del lápiz (Edit this file).
3. Modificar el archivo en formato markdown.
4. Una vez editado, ir a la parte de abajo de la página en la sección **Commit changes**, en el primer campo añadir una corta descripción de los cambios que se hicieron, puedes agregar una descripción más extensa en el siguiente campo, de manera opcional.
5. Guardar los cambios dando click en el botón verde **Commit changes**.

A continuación, mostramos la lista de documentos que se pueden editar:

### Página principal

La página principal consta de nueve secciones, cada sección es un archivo editable en markdown y contiene variables con opciones diferentes para configurar la sección, se encuentran en la carpeta **collections** como se muestra acontinuación:
  - **collections/_home/1-main.md**
  - **collections/_home/2-intro.md**
  - **collections/_home/3-section.md**
  - **collections/_home/4-section.md**
  - **collections/_home/5-section.md**
  - **collections/_home/6-highlight-section.md**
  - **collections/_home/7-section.md**
  - **collections/_home/8-section.md**
  - **collections/_home/9-contacto.md**

A estos archivos se les puede modificar el nombre, pero manteniendo la numeración de acuerdo al orden que quieres seguir en el sitio final.

A continuación te mostramos y explicamos las variables que deberás modificar dentro del archivo de cada sección de acuerdo al contenido que vas a agregar:

#### Portada, archivo **1-main.md**
En esta sección podrás mostrar una imagen de fondo que ocupa toda la pantalla, un título principal o un logo, un texto corto y botones.

Variables:

```
---
title: Inicio -> # El título de la sección, esto se mostrará en el menú que aparecerá en la parte derecha de la pantalla.
main-section: true -> # Activa los estilos para que se muestre la imagen de fondo principal y los textos destacados.
main-logo: todosloscontratoscr-logo-blanco.png -> # Si quieres mostrar tu logo, añade el nombre del archivo que ya deberá estar en la carpeta **assets/img/**.

# Column options
one-column-section: true -> # Deberá estar activada para mostrar la sección en una sola columna
---
```

Contenido:

Abajo de la sección de variables, podrás agregar el texto corto y los botones que necesites, en formato markdown. Recomendamos mantener el largo del texto que se encuentra de ejemplo.

#### Introducción, archivo **2-intro.md**
En esta sección podrás agregar un título, texto, subtítulos y añadir una imagen, video o iframe y un botón. También está la opción de activar una sección de notas que aparecerá debajo.

Variables:

```
---
title: Introducción -> # Título de la sección
cta-button-section: true -> # Activar si quieres mostrar un botón al final de la sección
button:
  link: "https://projectpoder.github.io/tolococr/" -> # Url del botón
  text: "Botón"  -> # Nombre del botón
# Media section
media: true -> # Activar para añadir una imagen, video o iframe, solo puedes elegir una opción
media-type: # Fill only one option
  image: -> # Añadir el nombre del archivo que deberá estar ya en la carpeta assets/img
  iframe: https://link.com -> # Agregar el link del iframe
  video: https://youtube.com -> # Agregar el link al video

# If iframe, set the different iframe size, depending of de size screen
iframe-size: -> # Esta opción funcionará si agregaste un iframe, podrás configurar el alto del iframe dependiendo de el tamaño de la pantalla
  xl-size: "20%" # Extra large screen ≥1280px
  lg-size: "30%" # Large screen ≤1279px
  md-size: "50%" # Medium screen ≤992px
  sm-size: "100%" # Small screen ≤768px
  xs-size: "120%" # Extra screen small <576px

# Column options
one-column-section: true -> # Activar para mostrar el contenido en una sola columna

# Section background and text colors
background-color: "#ffffff" -> # Elige un color de fondo para la sección
text-color: "#333333" -> # ELige el color del texto de la sección

# Article information -> # Con estas variables, activamos el área de notas de esta sección
articles: true -> # Muestra las notas
articles-section:
  background-color: "#EFEFEF" -> # Modifica el color del fondo de toda la sección de notas
# Article 1
article-content: -> # Aquí puedes agregar la información de una nota como se muestra con los textos de ejemplos
  title: Título de la nota
  author: Marisol Carrillo
  organization: PODER
  description: Proin tempus vehicula nibh, et mollis erat consequat sit amet. Aliquam molestie, elit feugiat sagittis luctus, ex lorem ultrices elit, ac molestie orci elit eu nisi. Phasellus accumsan fringilla ligula, id vulputate lorem bibendum in. Fusce congue ullamcorper tempus. In metus velit, finibus et libero nec, tempus aliquam metus.
  image: bg-masthead.jpg
  link: https://github.com/ProjectPODER
# Article 2
article-content2: -> # Información de la segunda nota de la sección
  title: Título de la nota 2
  author: Marisol Carrillo
  organization: PODER
  description: Proin tempus vehicula nibh, et mollis erat consequat sit amet. Aliquam molestie, elit feugiat sagittis luctus, ex lorem ultrices elit, ac molestie orci elit eu nisi. Phasellus accumsan fringilla ligula, id vulputate lorem bibendum in. Fusce congue ullamcorper tempus. In metus velit, finibus et libero nec, tempus aliquam metus.
  image: bg-masthead.jpg
  link: https://github.com/ProjectPODER
---
```

Contenido:

Después de la sección de variables, podrás añadir textos y subtítulos en formato markdown. Puedes añadir el texto que quieras, aquí no hay límite.

#### Sección general de una columna, archivo **3-section.md**
Esta sección general, contiene un título, texto, la opción de mostrar una imagen, video o iframe, un botón y  una sección de notas. Es la misma estructura que la Introducción y se muestra en una sola columna.

Variables:

```
title: Municipalidad
cta-button-section: true
button:
  link: "https://projectpoder.github.io/tolococr/"
  text: "Botón"
# Media section
media: true
media-type:
  image: graphic-example1.png
  iframe:
  video:
# Column options
one-column-section: true

# Section background and text colors
background-color: "#ffffff"
text-color: "#333333"

# Article information
articles: true
articles-section:
  background-color: "#EFEFEF"
# Article 1
article-content:
  title: Título de la nota
  author: Marisol Carrillo
  organization: PODER
  description: Proin tempus vehicula nibh, et mollis erat consequat sit amet. Aliquam molestie, elit feugiat sagittis luctus, ex lorem ultrices elit, ac molestie orci elit eu nisi. Phasellus accumsan fringilla ligula, id vulputate lorem bibendum in. Fusce congue ullamcorper tempus. In metus velit, finibus et libero nec, tempus aliquam metus.
  image: bg-masthead.jpg
  link: https://github.com/ProjectPODER
# Article 2
article-content2:
  title: Título de la nota 2
  author: Marisol Carrillo
  organization: PODER
  description: Proin tempus vehicula nibh, et mollis erat consequat sit amet. Aliquam molestie, elit feugiat sagittis luctus, ex lorem ultrices elit, ac molestie orci elit eu nisi. Phasellus accumsan fringilla ligula, id vulputate lorem bibendum in. Fusce congue ullamcorper tempus. In metus velit, finibus et libero nec, tempus aliquam metus.
  image: bg-masthead.jpg
  link: https://github.com/ProjectPODER
```

Contenido:

Después de la sección de variables, podrás añadir textos y subtítulos en formato markdown. Puedes añadir el texto que quieras, tampoco hay límite.

#### Sección de dos columnas, archivo **4-section.md**
En esta sección podrás mostrar un título, un texto y una imagen, video o iframe en dos columnas y con un fondo de color, el color lo toma de la configuración del color primario que tenga el sitio.

Variables:

```
---
title: Section 4 -> # Título de la sección
# Media section
media: true -> # Activa el mostrar una imagen, video o iframe, solo se puede llenar una opción
media-type:
  image: graphic-example1.png -> # Nombre del archivo que ya deberá estar en la carpeta assets/img
  iframe: -> # Link entre comillas del iframe
  video: -> # Link entre comillas del video
# Column options
one-column-section: false -> # Desactiva la vista de una columna
two-columns-section: true -> # Activa la vista de dos columnas
# If two columns is true
# Media position
media-left: false - > # En estasección mostraremos la imagen, video o iframe en la columna derecha, por eso está desactivada esta opción
# Section background and text colors
background-color: "#ffffff" -> # Selecciona el color de fondo de toda la sección
text-color: "#ffffff" -> # Selecciona el color del texto de toda la sección

---
```

Contenido:

Aquí podrás agregar el título y el texto en la columna izquierda, recomendamos que no sean textos muy largos, es en formato markdown.

#### Sección de dos columnas, archivo **5-section.md**
Esta sección es la misma que la anterior, pero cambiamos la opción de mostrar la imagen, video o iframe en la columna izquierda y mostramos la sección de notas debajo.

Variables:

```
---
title: section 5
# Media section
media: true
media-type:
  image:
  iframe:
  video: https://www.youtube.com/embed/TYCBicKyVhs -> # Añadir un video

# Column options
one-column-section: false
two-columns-section: true
# If two columns is true
# Media position
media-left: true -> # Activa la opción de mostrar la imagen, video o iframe en la columna izquierda
# Section background and text colors
background-color: "#ffffff"
text-color: "#ffffff"

# Article information
articles: true -> # Activamos la opción de mostrar notas
articles-section:
  background-color: "#EFEFEF"
# Article 1
article-content:
  title: Título de la nota
  author: Marisol Carrillo
  organization: PODER
  description: Proin tempus vehicula nibh, et mollis erat consequat sit amet. Aliquam molestie, elit feugiat sagittis luctus, ex lorem ultrices elit, ac molestie orci elit eu nisi. Phasellus accumsan fringilla ligula, id vulputate lorem bibendum in. Fusce congue ullamcorper tempus. In metus velit, finibus et libero nec, tempus aliquam metus.
  image: bg-masthead.jpg
  link: https://github.com/ProjectPODER
# Article 2
article-content2:
  title: Título de la nota 2
  author: Marisol Carrillo
  organization: PODER
  description: Proin tempus vehicula nibh, et mollis erat consequat sit amet. Aliquam molestie, elit feugiat sagittis luctus, ex lorem ultrices elit, ac molestie orci elit eu nisi. Phasellus accumsan fringilla ligula, id vulputate lorem bibendum in. Fusce congue ullamcorper tempus. In metus velit, finibus et libero nec, tempus aliquam metus.
  image: bg-masthead.jpg
  link: https://github.com/ProjectPODER
---
```

Contenido:

Aquí podrás agregar el título y el texto en la columna derecha, recomendamos que no sean textos muy largos, es en formato markdown.

#### Sección destacada, archivo **6-highlight-section.md**
En esta sección podrás destacar contenido, consta de un título, texto y un botón, podrás modificar el color de fondo de la sección y de la caja contenedora del texto.

Variables:

```
---
title: Highlight
cta-button-section: true
button:
  link: "https://projectpoder.github.io/tolococr/"
  text: "Botón"
# Highlight section options
highlight-section: true -> # Activar para mostrar los estilos de la sección destacada
highlight-section-background: "#006607" -> # Agrega un color de fondo del contenedor del texto
# Column options
one-column-section: true -> # Muestra una sola columna

# Section background and text colors
background-color: "#ffffff"
text-color: "#ffffff"
---
```

Contenido:

Añade un título o subtítulo y texto que quieras destacar.

#### Sección general de una columna, archivo **7-section.md** y **8-section.md**
Esta sección muestra títulos, textos, imagen, video o iframe y un botón, en una columna. La configuración del ejemplo muestra secciones simples de texto.

Variables:

```
---
title: Sobre el proyecto
cta-button-section: false
button:
  link: "https://projectpoder.github.io/tolococr/"
  text: "Botón"
# Media section
media: false
media-type:
  image:
  iframe:
  video:
# Column options
one-column-section: true

# Section background and text colors
background-color: "#ffffff"
text-color: "#333333"

---
```

Contenido:

Agrega títulos o subtítulos y párrafos de texto que sean necesarios. Aquí no hay límite de texto.

#### Sección de contacto, archivo **9-contacto.md**
En esta sección se puede añadir el título, un texto y un link que vaya al lugar donde quieras que te contacten.

Variables:

```
---
title: Contacto
cta-button-section: true
button:
  link: "https://projectpoder.github.io/tolococr/"
  text: "Botón"

# Column options
one-column-section: true

# Section background and text colors
background-color: "#97C461"
text-color: "#333333"

---
```

Contenido:

Añade un título y texto.

#### Pie de página
Para editar el pie de página, deberás editar los archivos en la carpeta **colletions/_footer**. Encontrarás dos archivos llamados **column-1.md** o **column-2.md**, cada archivo tiene variables para configurar la sección, donde podrás agregar un título y un logo.

Variables:

```
---
title: Proyecto de -> # Título de la columna
image-logo: logoPODER_19.png -> # Nombre del archivo que deberá estar en la carpeta assets/img
image-name: Logo de PODER -> # Nombre de la imagen
width-logo: 100px -> # Tamaño de la imagen
# If there are more logos
image-logo2: Innovaap_logo.png -> # Puedes agregar un segundo logo en la misma columna
image-name2: Logo de Innovaap
width-logo2: 170px
---
```
#### Embeber iframes de Kibana
A continuación, te explicamos los pasos a seguir para embeber un iframe de Kibana correctamente:

- En Kibana, seleccionar la opción de compartir para embed la visualización (se puede llegar desde la edición del dashboard).
- La visualización debe estar en Simona.
- Copiar la visualización al espacio público desde saved objects, buscando por nombre, elegir "clone to space" y elegir public.
- Ir al espacio público, buscar la visualización, seleccionar share y luego embed.
- La elección de snapshot o saved object depende de si queremos que los numeros se actualicen (saved object) o si queremos que siempre queden así (snapshot).
- De la url copiada, eliminar todo excepto la url que está entre comillas en src.
- Poner esta url en la variable **iframe** de la sección en la que se quiere agregar.

Por ejemplo:
```
title: Introducción
cta-button-section: false
button:
  link:
  text:
# Media section
media: true
media-type: # Fill only one option
  image:
  # Agregar el link del iframe
  iframe: "https://publico-simona.quienesquien.wiki/s/publico/app/visualize#/edit/e5b829d0-ca23-11eb-b96d-0715cd05503e?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:'2008',to:'2019'))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'Cantidad%20de%20contratos'),schema:metric,type:count),(enabled:!f,id:'2',params:(customLabel:'Suma%20de%20monto',field:monto),schema:metric,type:sum),(enabled:!t,id:'3',params:(customLabel:'Cantidad%20de%20Adjudicatarios',field:adjudicatario.keyword),schema:metric,type:cardinality),(enabled:!t,id:'5',params:(customLabel:'Cantidad%20de%20Instituciones',field:institucion.keyword),schema:metric,type:cardinality),(enabled:!t,id:'6',params:(customLabel:'Cantidad%20de%20municipios',field:municipio.keyword),schema:metric,type:cardinality)),params:(addLegend:!f,addTooltip:!t,metric:(colorSchema:Greens,colorsRange:!((from:0,to:100),(from:100,to:10000),(from:10000,to:30000),(from:30000,to:40000),(from:40000,to:500000)),invertColors:!f,labels:(show:!t),metricColorMode:Background,percentageMode:!f,style:(bgColor:!f,bgFill:%23000,fontSize:60,labelColor:!f,subText:''),useRanges:!f),type:metric),title:SICOP_DASH_numeros,type:metric))"
  video:

# If iframe, set the different iframe size, depending of de size screen
iframe-size: -> # Esta opción funcionará si agregaste un iframe, podrás configurar el alto del iframe dependiendo de el tamaño de la pantalla
  xl-size: "20%" # Extra large screen ≥1280px
  lg-size: "30%" # Large screen ≤1279px
  md-size: "50%" # Medium screen ≤992px
  sm-size: "100%" # Small screen ≤768px
  xs-size: "120%" # Extra screen small <576px
```


### Página Acerca

Para editar los textos de la página Acerca:
  - **4-about.md**

### Sliders

Para editar los textos de cada slide del slider:
  - **sliders/_first-slider/slide-1.md**
  - **sliders/_first-slider/slide-2.md**
  - **sliders/_first-slider/slide-3.md**

Para añadir o quitar un slide, sólo debes añadir o quitar un archivo **.md** dentro de la carpeta **_first-slider**.

Para cambiar o añadir una imagen (_.jpg_, _.png_ o _.svg_) dentro del slider, debes agregar la imagen dentro de la carpeta **assets/img/** y agregar el nombre del archivo dentro del archivo correspondiente al slide en el que aparecerá la imagen.

```
---
title: First Slide
**image: graphic-example.png** -> # aquí va el nombre del archivo.
---
```

Para editar los textos del slider con la visualización:
  - **sliders/_visualization-slider/slide-1.md**
  - **sliders/_visualization-slider/slide-2.md**
  - **sliders/_visualization-slider/slide-3.md**


### Nombre de páginas y permalinks

Puedes editar el nombre y el permalink que se mostrará en cada sección del menú principal.

Para eso, debes ubicar en cada archivo editable, el área donde se encuentra esta información, por ejemplo:

```
---
layout: home
title: Home
permalink: /
---
```

Para cambiar el nombre de la página, edita:

```
---
title: Nombre de la página
---
```

Para cambiar el permalink, edita:
```
---
permalink: /link-de-la-pagina/
---
```

### Cambiar el orden de los elementos del menú principal

Tower Builder añade los elementos del menú principal en orden alfabético, se pueden reordenar cambiando el número que se encuentra en el nombre del archivo, de acuerdo al orden que se desee.

Por default tenemos este orden:

1. Home
2. slider.html
3. visualization-slider.html
4. contracts.html
5. about.md
6. styleguide.md

Estos son los pasos para editar el nombre de un archivo en Github:

1. Da click en el archivo que quieres modificar.
2. Dentro del archivo, dar click en el ícono del lápiz (Edit this file).
3. En la parte superior de la página, encontrarás el campo donde se modifica el nombre del archivo.
4. Modificar el nombre del archivo.
5. Una vez modificado, ir a la parte de abajo de la página en la sección **Commit changes**, en el primer campo añadir una corta descripción de los cambios que se hicieron, puedes agregar una descripción más extensa en el siguiente campo, de manera opcional.
6. Guardar los cambios dando click en el botón verde **Commit changes**.

**Nota:** Para quitar la página _Styleguide_ del menú, debes ir al archivo de configuraciones **_config.yml** y escribir el nombre completo del archivo en la sección _exclude_, quedando de esta manera:

```
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - update_boostrap.sh
  - vendor/
  - docs/
  - **6-styleguide.md**
```

### Agregar un elemento del menú

Puedes crear un archivo donde podrás añadir texto y aparecerá dentro del menú.

Los pasos para crear un archivo son:

1. En GitHub, navegua a la página principal del repositorio.
2. En el repositorio, busca la carpeta donde deseas crear un archivo.
3. Encima de la lista de archivos, haz clic en _Create new file_.
![Crear nuevo documento](https://help.github.com/assets/images/help/repository/create_new_file.png)
4. En el campo de _Name your file_, escribe el nombre y la extensión del archivo. Para crear subdirectorios, escribe el /separador de directorios.
![Nombrar un nuevo archivo](https://help.github.com/assets/images/help/repository/new-file-name.png)
5. En la pestaña _Edit new file_ , agrega contenido al archivo.
6. Es importante agregar siempre a los archivos nuevos creados, el siguiente código al incio del archivo:
```
---
layout: page -> # siempre debe ser **page**
title: Nombre de la página -> # puedes cambiar al título que desees
permalink: /nombre-del-link/ -> # puedes cambiar al nombre del link que desees mostrar
---
```

7. Para revisar el nuevo contenido, haz clic en _Preview_.
![Vista previa](https://help.github.com/assets/images/help/repository/new-file-preview.png)
8. Al final de la página, en el primer campo de la sección **Commit new file**, añadir una corta descripción de los cambios que se hicieron, puedes agregar una descripción más extensa en el siguiente campo, de manera opcional.
9. Guardar los cambios dando click en el botón verde **Commit new file**.

Para información más detallada de cómo crear un nuevo archivo, visita la [documentación oficial de Github](https://help.github.com/en/articles/creating-new-files).

### Eliminar un elemento del menú

Para quitar un elemento del menú, basta con eliminar el archivo.

Para eliminar un archivo en Github:

1. Da click en el archivo que quieres eliminar.
2. En la parte de arriba del documento, da click en el ícono del bote de basura.
3. Al final de la página, en el primer campo de la sección **Commit changes**, añadir una corta descripción de los cambios que se hicieron, puedes agregar una descripción más extensa en el siguiente campo, de manera opcional.
5. Guardar los cambios dando click en el botón verde **Commit changes**.


## Artículos

Los artículos son notas que analizan contratos, y aparecen vinculados a estos en el gráfico.

Para que se puedan vincular, debes saber el identificador del contrato OCID y agregarlo en el archivo, de la siguiente manera:

```
person: Juan Carlos Dueño
```


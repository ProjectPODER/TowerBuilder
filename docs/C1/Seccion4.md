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

Para editar los textos de la página principal:
  - **1-home.md**

Para editar los textos de la página Acerca:
  - **4-about.md**

Para editar los textos de cada slide del slider:
  - **collections/_first-slider/slide-1.md**
  - **collections/_first-slider/slide-2.md**
  - **collections/_first-slider/slide-3.md**

Para añadir o quitar un slide, sólo debes añadir o quitar un archivo **.md** dentro de la carpeta **_first-slider**.

Para cambiar o añadir una imagen (_.jpg_, _.png_ o _.svg_) dentro del slider, debes agregar la imagen dentro de la carpeta **assets/img/** y agregar el nombre del archivo dentro del archivo correspondiente al slide en el que aparecerá la imagen.

```
---
title: First Slide
**image: graphic-example.png** -> aquí va el nombre del archivo.
---
```

Para editar los textos del slider con la visualización:
  - **collections/_visualization-slider/slide-1.md**
  - **collections/_visualization-slider/slide-2.md**
  - **collections/_visualization-slider/slide-3.md**


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
6. posts.md
7. styleguide.md

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
  - 7-styleguide.md
```

### Agregar un elemento del menú

Puedes crear un archivo donde podrás añadir texto y aparecerá dentro del menú.

Los pasos para crear un archivo son:

1. En GitHub, navegua a la página principal del repositorio.
2. En el repositorio, busca la carpeta donde deseas crear un archivo.
3. Encima de la lista de archivos, haz clic en _Create new file_.
   ![](https://help.github.com/assets/images/help/repository/create_new_file.png)

4. En el campo de _Name your file_, escribe el nombre y la extensión del archivo. Para crear subdirectorios, escribe el /separador de directorios.
   ![](https://help.github.com/assets/images/help/repository/new-file-name.png)

5. En la pestaña _Edit new file_ , agrega contenido al archivo.
6. Es importante agregar siempre a los archivos nuevos creados, el siguiente código al incio del archivo:
   ```
   ---
   layout: page -> siempre debe ser **page**
   title: Nombre de la página -> puedes cambiar al título que desees
   permalink: /nombre-del-link/ -> puedes cambiar al nombre del link que desees mostrar
   ---
   ```
7. Para revisar el nuevo contenido, haz clic en _Preview_.
   ![](https://help.github.com/assets/images/help/repository/new-file-preview.png)

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


### Crear un artículo

Para crear un artículo, agrega un archivo en la carpeta **_posts** que está dentro de **collections**.

El nombre del nuevo archivo debe tener el siguiente formato, de lo contrario, Tower Builder no podrá leer el artículo:

```
YEAR-MONTH-DAY-title.MARKUP
```

Donde **YEAR** tiene un número de cuatro dígitos, **MONTH** y **DAY** tienen números de dos dígitos, y **MARKUP** es la extensión del archivo que representa el formato utilizado. Por ejemplo, los siguientes son ejemplos de nombres válidos:

```
2018-12-31-new-years-eve-is-awesome.md
2018-09-12-how-to-write-a-blog.md
```

Todos los archivos de los artículos, deben comenzar con el siguiente encabezado:

```
---
layout: post -> Siempre debe ser post
title:  "Welcome to Jekyll!" -> Puedes cambiarlo por el nombre que desees para tu artículo.
author: "Name" -> Puedes escribir el nombre del autor del artículo
---
```

Debajo del encabezado, puedes seguir con el contenido del artículo, siguiendo el mismo formato de los demás textos editables, que es Markdown.

Para que se puedan vincular con el gráfico, debes saber el identificador del contrato OCID y agregarlo en el encabezado del  archivo, de la siguiente manera:

```
person: Juan Carlos Dueño
```

Si deseas conocer todas las opciones posibles para los encabezados de los artículos y más configuraciones relacionadas, [visita este link](https://jekyllrb.com/docs/posts/).
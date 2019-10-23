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

Para añadir o quitar un slide, sólo debes añadir o quitar un archivo **.md** dentro de la carpeta **_first-slider**, con su respectivo encabezado.

Para cambiar o añadir una imagen (_.jpg_, _.png_ o _.svg_) dentro del slider, debes agregar la imagen dentro de la carpeta **assets/img/** y agregar el nombre del archivo dentro del archivo correspondiente al slide en el que aparecerá la imagen.

```
---
title: First Slide
image: graphic-example.png -> aquí va el nombre del archivo.
---
```

Si quieres agregar un slide con solo texto y ocupando todo el ancho de la página, deberás borrar toda la línea de **image** del encabezado.

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

1. home
2. slider.html
3. visualization-slider.html
4. contracts.html
5. posts.md
6. about.md
7. styleguide.md

Estos son los pasos para editar el nombre de un archivo en Github:

1. Da click en el archivo que quieres modificar.
2. Dentro del archivo, dar click en el ícono del lápiz (Edit this file).
3. En la parte superior de la página, encontrarás el campo donde se modifica el nombre del archivo.
4. Modificar el nombre del archivo.
5. Una vez modificado, ir a la parte de abajo de la página en la sección **Commit changes**, en el primer campo añadir una corta descripción de los cambios que se hicieron, puedes agregar una descripción más extensa en el siguiente campo, de manera opcional.
6. Guardar los cambios dando click en el botón verde **Commit changes**.

<!-- **Nota:** Para quitar la página _Styleguide_ del menú, debes ir al archivo de configuraciones **_config.yml** y escribir el nombre completo del archivo en la sección _exclude_, quedando de esta manera:

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
5. Guardar los cambios dando click en el botón verde **Commit changes**. -->

### Agregar una nueva página

Para agregar una nueva página, debes crear un archivo donde podrás añadir texto en formato markdown.

Los pasos para crear un archivo son:

1. En GitHub, navega a la página principal del repositorio.
2. En el repositorio, busca la carpeta donde deseas crear un archivo.
3. Encima de la lista de archivos, haz clic en _Create new file_.
   ![](https://help.github.com/assets/images/help/repository/create_new_file.png)

4. En el campo de _Name your file_, escribe el nombre y la extensión del archivo (.md).
   ![](https://help.github.com/assets/images/help/repository/new-file-name.png)

5. En la pestaña _Edit new file_ , agrega contenido al archivo.
6. Es importante agregar siempre a los archivos nuevos creados, un encabezado con el siguiente código, siempre irá al incio del archivo:

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


### Agregar un elemento del menú

Al crear una nueva página, que contenga el encabezado descrito anteriormente, automáticamente se añadirá al final del menú.

Si quieres cambiar el orden en el que debe aparecer la página en el menú, coloca el número correspondiente y modifica los números de los elementos que ya están. Para renombrar un archivo, sigue la [documentación de Github aquí](https://help.github.com/en/articles/renaming-a-file).


### Ocultar/Eliminar un elemento del menú

Para quitar un elemento del menú, basta con eliminar el archivo. 

Para eliminar un archivo en Github:

1. Da click en el archivo que quieres eliminar.
2. En la parte de arriba del documento, da click en el ícono del bote de basura.
3. Al final de la página, en el primer campo de la sección **Commit changes**, añadir una corta descripción de los cambios que se hicieron, puedes agregar una descripción más extensa en el siguiente campo, de manera opcional.
5. Guardar los cambios dando click en el botón verde **Commit changes**.

Si quieres excluir una página del menú, pero sin eliminar el archivo y sin mantenerla en línea, sólo debes agregar al encabezado **"published: false"**:

```
---
published: false
permalink: /nombre-del-link/ -> El link ya no estará disponible.
---
```

Si quieres excluir el elemento del menú, pero manteniendo la página en línea, deberás borrar el título del encabezado:

```
---
layout: page
title: Nombre de la página -> borra esta línea del archivo para excluir la página del menú.
permalink: /nombre-del-link/ -> El link seguirá disponible.
---
```

**Nota:** Con las dos opciones anteriores, podrás ocultar o eliminar cualquier sección como el Slider, la Visualización o la página de Styleguide de tu proyecto final.

### Editar el nombre del botón Más información del menú

Para cambiar el título del botón que aparece cuando se reduce el tamaño de ancho de la pantalla, sólo debes cambiar el texto en el archivo **_config.yml** de la siguiente variable:

```
menu_button_title: Más información -> cámbialo al texto que desees
```

### Editar los títulos de la página del Buscador de Contratos

Podrás cambiar los títulos de los diferentes filtros del buscador de contratos y los títulos de las columnas de la tabla en el archivo **_config.yml**, este es un ejemplo de la configuración que tiene por default:

```
contracts_title: Contratos por empresas
search_title: Búsqueda
search_placeholder: Introduce palabra clave a buscar
amount_title: Monto total (en pesos mexicanos)
amount_from_placeholder: Desde $
amount_to_placeholder: hasta $
type_contract_title: Tipo de contratación
type_contract_title_tooltip: La ley obliga a la Unidad Compradora a definir el tipo de contratación, ya que varían las normas en cada caso.
type_contract_all_option: Todo
type_procedure_title: Tipo de procedimiento
type_procedure_title_tooltip: La licitación pública es según la ley mexicana el procedimiento adecuado para contratar obra publica. Excepcionalmente también se pueden realizar otro tipo de procedimientos como adjudicación directa, convenio e invitación a cuando menos tres proveedores.
type_procedure_all_option: Todo
date_range_title: Rango de fechas
date_range_from_placeholder: Desde
date_range_to_placeholder: hasta
date_range_title_tooltip: Encuentra los contratos activos entre dos fechas.
filter_footnote_title: Los filtros aplican sobre los contratos que tienen las empresas.

# Customize the Contract table titles
column_1: Empresas 
column_2: Cant. de contratos
column_3: Monto total
```
Los cambios realizados se podrán ver así:

![](https://towerbuilder.projectpoder.org/assets/img/contratos.png)

## Artículos

Los artículos son notas que analizan contratos, y aparecen vinculados a estos en el gráfico.


### Crear un artículo

Para crear un artículo, en tu repositorio, ve dentro de la carpeta **_posts** que a su vez está dentro de **collections**.

Da click en **Create new file**.

Escribe dentro del campo **Name your file** el nombre del nuevo archivo, que debe tener el siguiente formato, de lo contrario, Tower Builder no podrá leer el artículo:

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

Para guardar el nuevo archivo, da click en el botón **Commit new file** después de agregar un comentario sobre el nuevo archivo.

Si deseas conocer todas las opciones posibles para los encabezados de los artículos y más configuraciones relacionadas, [visita este link](https://jekyllrb.com/docs/posts/).

**Importante:** Todas las modificaciones se reflejan automáticamente en el sitio público, este proceso puede tardar varios minutos para verse en la web.
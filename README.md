Documentacion TowerBuilder

TowerBuilder es un sistema que no requiere programación para generar sitios web con visualizaciones de datos de contrataciones, especialmente orientado a grandes obras públicas, inspirado por www.torredecontrol.org.

¿Qué necesito para armar mi sitio con TowerBuilder?
* Conseguir un listado de contrataciones en formato OCDS.
* Armar una planilla de cálculo con los dueños de las empresas contratistas.
* Redactar y editar textos en formato MarkDown.
* Una cuenta de GitHub.com.

¿Qué ventajas tiene usar TowerBuilder para armar mi sitio?
* El diseño predeterminado no requiere ningún esfuerzo de programación ni alojamiento del sitio, se hace todo desde GitHub.com
* Tendrás una visualización de datos impactante y un útil sistema de búsqueda de contratos.
* Si tienes acceso a los datos, podrás armar tu sitio en minutos.
* Podrás personalizar el diseño y los textos todo lo que gustes, de acuerdo a tus conocimientos y el tiempo disponible.
* Podrás utilizar los datos abiertos del gobierno de tu país y demostrar la utilidad del estándar de contrataciones abiertas (OCDS) para el periodismo.

¿Cuáles son los pasos?
1. Bifurcar el repositorio
2. Editar la configuración
3. Agregar los datos
4. Editar los textos
5. Publicar el sitio

## Bifurcar el repositorio
Para poder empezar con tu sitio, primero debes crear tu propio repositorio. El repositorio es el espacio en el que estarán los archivos de tu sitio, y bifurcar significa harás una copia a partir de este para tomarlo como base.

1. Es necesario estar registrado con tu cuenta de GitHub.com si no tienes una cuenta puedes hacerlo aquí.https://github.com/join?source=header-home

  Excención de responsabilidades: GitHub.com es una subsidiaria de Microsoft Inc. que provee servicios de alojamiento de repositorios git y de alojamiento web de forma sencilla y gratuita, por lo que fue elegida para este proyecto y para publicar el código de nuestra organización.

1.1. GitHub te pedirá que verifiques tu dirección de correo, para más información puedes revisar la documentación oficial https://help.github.com/en/articles/verifying-your-email-address

1. Para bifurcar el repositorio debes navegar al inicio de este repositorio (https://github.com/ProjectPODER/TowerBuilder) y clickear en el botón "fork" en el extremo superior derecho de la página. Esto creará una nueva página dentro de tu usuario, es decir http://github.com/tu_usuario/TowerBuilder y a partir de ahora trabajarás allí, ya que allí tendrás permiso de modificar los archivos y publicar sitios. Si tienes más dudas revisa la documentación de github sobre cómo bifurcar un repositorio https://help.github.com/en/articles/fork-a-repo

También puedes leer sobre bifurcaciones (forks) en general https://help.github.com/en/articles/about-forks

1. Para habilitar a otros colaboradores a que puedan editar los datos y textos debes configurar tu repositorio de acuerdo a la documentación de github https://help.github.com/en/articles/inviting-collaborators-to-a-personal-repository

### Definir la dirección de tu sitio
Inicialmente, tu nombre de usuario y el nombre del repositorio se verán reflejado en la dirección URL de tu sitio cuando esté publicado. Este tendrá la forma de tu_usuario.github.io/TowerBuilder

1. si deseas cambiar la parte de tu_usuario podrás cambiar tu nombre de usuario (https://help.github.com/en/articles/changing-your-github-username) o crear una cuenta de organización en Github y elegir la organización al momento de bifircuar el repositorio (https://help.github.com/en/articles/creating-a-new-organization-from-scratch). Si ya has creado el repositorio, puedes moverlo a la organización (https://help.github.com/en/articles/transferring-a-repository).
1. Puedes cambiar el nombre de tu repositorio. Si deseas cambiar la parte de TowerBuilder puedes cambiar el nombre del repositorio (https://help.github.com/en/articles/renaming-a-repository).
1. GitHub.com ofrece la posibilidad de tener dominios personalizados para tus páginas, puedes revisar la documentación aquí https://help.github.com/en/articles/using-a-custom-domain-with-github-pages

## Editar la configuración
Ahora comenzarás a darle forma a tu sitio, deberás definir un nombre para tu proyecto y otros atributos de configuración. Para esto deberás:

1. Navegar hasta el archivo de configuración, para eso debes entrar a tu repositorio y buscar el archivo "config.yml".

1. Clickea en el nombre del archivo para abirirlo.

1. Clickea en el botón "edit" en la parte superior derecha.

1. Comienza a cambiar valores. Este archivo está en un formato llamado YAML, esto significa que está copuesto por una serie de pares de variables con sus valores, cada línea comienza con un nombre de variable, un signo de dos puntos (:) y luego el valor. No debes cambiar nunca los nombres de las variables, sólo cambiarás lo que viene después de los dos puntos.
1.1. Lo primero que vas a cambiar es la variable title, esta define el nombre que tendrá tu sitio en diferentes lugares tales como la solapa del navegador, los resultados de búsqueda y en el encabezado del sitio. Para esto busca donde dice title: "TowerBuilder" y cambia el valor entre comillas por el título de tu sitio, por ejemplo title: "Análisis de contrataciones de la carretera sur".

1.1. Otros valores importantes a cambiar son: ... .. .. .. . .

1. Para un detalle de todas las posibles opciones revisa esta página: (opciones de configuración de towerbuilder)

## Agregar los datos

### Datos de contratos
Para esta parte, deberás tener el listado de contratos que quieres visualizar en el formato del estándar de contrataciones abiertas (OCDS).

Puedes obtenerlo de alguna de las fuentes OCDS (https://kingfisher-scrape.readthedocs.io/en/latest/sources.html) utilizando la herramienta Kingfisher para guardarlo en disco (https://kingfisher-scrape.readthedocs.io/en/latest/use-standalone.html). Para más información puedes revisar la documentación completa de Kingfisher  (https://ocdskingfisher.readthedocs.io/en/latest/)

El archivo de datos debe contener los records de los procesos de contratación (no los releases). Debe ser un array, es decir comenzar con corchetes cuadrados []. Para lograr que el archivo sea sólo el listado de records dentro de un array, puede ser necesario manipular el contenido del archivo, para esto recomendamos la herramienta ocdskit (https://github.com/open-contracting/ocdskit) y en particular jq (https://github.com/open-contracting/ocdskit/blob/master/docs/Using_jq.md).

### Datos de beneficiarios reales
Para crear el conjunto de datos de beneficiarios reales debes usar la plantilla disponible en BO-template.ods, editarla en un software de planilla de cálculo (LibreOffice Calc, MS Excel, Google Spreadsheets u otro) y modificar los valores.

Es importante que en cada fila pongas los nombres de las empresas tal cual están en el listado de contratos, para que se pueda vincular la información en el gráfico.

## Editar los textos
Los archivos de texto están en la carpeta textos/ y están en formato MarkDown. .. explicar markdown ...

### Textos principales
Los textos principales son los de las secciones que aparecen en el menú principal.

### Artículos
Los artículos son notas que analizan contratos, y aparecen vinculados a estos en el gráfico.

Para que se puedan vincular, debes saber el identificador del contrato OCID y agregarlo en el archivo, de la siguiente manera:

'''person: Juan Carlos Dueño'''

## Publicar el sitio
Una vez que hayas configurado tu sitio, agregado los datos y editado los texots, puedes publicar el sitio para verificar si está todo correcto.
https://help.github.com/en/articles/user-organization-and-project-pages


# Errores y correcciones
##¿Por qué no se ve el gráfico?
##¿Por qué no aparecen mis artículos vinculados con el gráfico?
##¿Por qué el formato de mi texto o artículo se rompe?
##Tengo otro problema
Si encuentras algún problema que no se tenga en cuenta en este manual o deseas ayuda para armar tu sitio, puedes ponerte en contacto con PODER a través de la siguiente dirección de e-mail info@quienesquien.wiki. Alternativamente puedes reportar una incidencia utilizando GitHub, en la siguiente dirección: https://github.com/ProjectPODER/TowerBuilder/issues

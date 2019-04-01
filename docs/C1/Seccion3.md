# Agregar los datos


## Datos de contratos

Para esta parte, deberás tener el listado de contratos que quieres visualizar en el formato del estándar de contrataciones abiertas (OCDS).

Puedes obtenerlo de alguna de las [fuentes OCDS](https://kingfisher-scrape.readthedocs.io/en/latest/sources.html) utilizando la herramienta [Kingfisher](https://kingfisher-scrape.readthedocs.io/en/latest/use-standalone.html) para guardarlo en disco . Para más información puedes revisar la [documentación completa de Kingfisher](https://ocdskingfisher.readthedocs.io/en/latest/).

El archivo de datos debe contener los records de los procesos de contratación (no los releases). Debe ser un array, es decir comenzar con corchetes cuadrados []. Para lograr que el archivo sea sólo el listado de records dentro de un array, puede ser necesario manipular el contenido del archivo, para esto recomendamos la [herramienta ocdskit](https://github.com/open-contracting/ocdskit) y en particular [jq](https://github.com/open-contracting/ocdskit/blob/master/docs/Using_jq.md).

## Datos de beneficiarios reales

Para crear el conjunto de datos de beneficiarios reales debes usar la plantilla disponible en BO-template.ods, editarla en un software de planilla de cálculo (LibreOffice Calc, MS Excel, Google Spreadsheets u otro) y modificar los valores.

Es importante que en cada fila pongas los nombres de las empresas tal cual están en el listado de contratos, para que se pueda vincular la información en el gráfico.


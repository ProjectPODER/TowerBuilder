# Personalizar los estilos del sitio

Puedes modificar algunos estilos de Tower Builder como los colores, la tipografía, la imagen de fondo de la Home y el tamaño del texto.

Para editar los estilos, debes entrar a la carpeta **_sass/** y abrir el archivo **_variables.scss**, dentro del documento, encontrarás algunas variables que podrás modificar.

Este archivo está en un formato llamado _.scss_, está compuesto por una serie de variables con sus valores, cada línea comienza con un nombre de variable, un signo de dos puntos (:) y luego el valor. 

```
$variable: valor
```

No debes cambiar nunca los nombres de las variables, sólo cambiarás lo que viene después de los dos puntos. 
    
## Cambiar los colores

Estas son las variables que encontrarás de manera determinada para los colores:
	
```
$blue:    #007bff !default;
$indigo:  #6610f2 !default;
$purple:  #6f42c1 !default;
$pink:    #e83e8c !default;
$red:     #dc3545 !default;
$orange:  #fd7e14 !default;
$yellow:  #ffc107 !default;
$green:   #28a745 !default;
$teal:    #20c997 !default;
$cyan:    #17a2b8 !default;
```

Los colores para un sitio web, generalmente se representan mediante el [sistema hexadecimal](https://www.w3schools.com/colors/colors_hexadecimal.asp), por ejemplo: **#007bff**.
    
Puedes cambiar los tonos de los colores que se encuentran por default cambiando el código hexadecimal o, sólo para la sección de colores, podrás añadir nuevas variables con colores nuevos, por ejemplo:

```
Para cambiar el tono
$blue:    #007bff !default;

Cambiar por
$blue:    #0056b2 !default;

Para añadir un color
$turquoise: #40e0d0;
```

El color principal de Tower Builder, está definido en la variable **$primary**, por default tiene la variable del color azul **$blue**, para cambiar el color, sólo debes reemplazarla por la variable del color que quieras, por ejemplo:

```
$primary:       $blue !default;

Cambiar por 
$primary:       $turquoise !default;

O dejar sin editar, si sólo cambiaste el tono del color.
```

Te recomendamos [este sitio](https://www.color-hex.com/)(en inglés) o [este sitio](https://htmlcolorcodes.com/es/selector-de-color/) (en español), para encontrar los códigos hexadecimales de los colores.

## Cambiar los colores del preloader

El preloader aparece cuando se está cargando el slider y la visualización, para cambiar los colores sólo deberás colocar el color que desees en las siguientes variables:

```
$preloader-color1: #1ee6d3;
$preloader-color2: #343a40;
$preloader-color3: $primary;
```

## Cambiar la imagen de fondo de la página principal

La variable para cambiar la imagen del fondo de la página prncipal la encuentras así:

```
$bgHome : "./img/bg-masthead.jpg";
```

1. Para cambiarla, necesitas agregar la imagen en la carpeta **assets/img/**, en formato **jpg** o **png**.
2. Después, ir al archivo **_variables.scss** y reemplazar el nombre de la imagen:

   ```
   Default
   $bgHome : "./img/bg-masthead.jpg";
   
   Cambiar por
   $bgHome : "./img/nombre-de-tu-archivo.jpg";
   ```

## Cambiar el logo

1. Agrega el archivo de tu logotipo en la carpeta **assets/img/**, en formato **jpg**,**png** o **svg**.

2. Ve al archivo de configuración **_config.yml** y cambia el valor de la variable **image** por el nombre del archivo de tu logotipo:

```
image: tb-logo.png
```
## Cambiar favicon

1. Reemplaza el archivo que se encuentra en la raíz del proyecto llamado **favicon.png** por tu favicon, deberá conservar el mismo nombre y de preferencia, la imagen debe tener como medidas: 32 x 32 pixeles.

## Adaptar la visualización para vistas en dispositivos móviles

De manera predeterminada, el archivo **3-visualization-slider.html** tiene configurada la opción de *"responsive"* como *"true"* para una mejor experiencia en la navegación en dispositivos móviles:

```
---
layout: default
title: Visualization
permalink: /visualization/
responsive: true
---
```

 Esto quiere decir que la visualización necesitará mostrarse en imágenes para las vistas en móviles, para esto deberás, una vez obtenida tu gráfica, convertir cada forma de tu visualización en imagen (.png o .jpg), debes agregar estas imágenes dentro de la carpeta **assets/img/** para poder agregarla posteriormente en el encabezado de cada slide correspondiente. Por ejemplo:

```
---
title: Slide 1
image: tu-grafica.png -> Aquí va el nombre de tu imagen.
---
```

También puedes desactivar la opción de *"responsive"* y evitar colocar la imagen en cada slide, sólo debes borrar la línea que dice **responsive: true** del encabezado del archivo **3-visualization-slider.html** y borrar del encabezado de cada slide toda la línea que comienza con **image:**.
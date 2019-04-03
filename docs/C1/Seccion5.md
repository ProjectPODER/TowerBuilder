# Editar los estilos

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

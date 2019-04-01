# Editar la configuración

Ahora comenzarás a darle forma a tu sitio, tendrás que definir un nombre para tu proyecto y otros atributos de configuración. Para esto deberás:

1. Navegar hasta el archivo de configuración, para eso debes entrar a tu repositorio y buscar el archivo "**config.yml**".

2. Da click en el nombre del archivo para abrirlo.

3. Da click en el botón "edit" en la parte superior derecha.

4. Comienza a cambiar valores. Este archivo está en un formato llamado YAML, esto significa que está compuesto por una serie de pares de variables con sus valores, cada línea comienza con un nombre de variable, un signo de dos puntos (:) y luego el valor. 

	```
	variable: valor
	```

	No debes cambiar nunca los nombres de las variables, sólo cambiarás lo que viene después de los dos puntos. 
    
    - Lo primero que vas a cambiar es la variable _title_, esta define el nombre que tendrá tu sitio en diferentes lugares tales como la solapa del navegador, los resultados de búsqueda y en el encabezado del sitio. Para esto busca donde dice:
	
	```
    title: "TowerBuilder" 
	```
    y cambia el valor entre comillas por el título de tu sitio, por ejemplo 
	```
    title: "Análisis de contrataciones de la carretera sur".
	```

	- Otros valores importantes a cambiar son: 

	```
    image: tb-logo.png //cambiarlo por el logo de tu proyecto o dejarlo vacío, es opcional
    description: >- //cambiarlo por la descripción de tu proyecto 
  	TowerBuilder es un sistema que no requiere programación para generar sitios web con visualizaciones de datos de contrataciones, especialmente orientado a grandes obras públicas, inspirado por www.torredecontrol.org. 
	```

    - Para un detalle de todas las posibles opciones revisa esta página: (opciones de configuración de towerbuilder)

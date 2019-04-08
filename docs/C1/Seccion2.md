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
    image: tu-logo.png -> cambiarlo por el logo de tu proyecto o dejarlo vacío, es opcional
    description: >- //cambiarlo por la descripción de tu proyecto 
  	Tu descripción va aquí 
	```

	- Para que en el slider de la Visualización, aparezca el nombre principal de tu gráfico, edita la variable: 

	```
    graphTitle: "Nombre del gráfico"
	```

	- Jekyll tiene un sistema de **Plugins**  que permiten ejecutar código personalizado sin necesidad de modificar la fuente de Jekyll. En la página de configuración de Tower Builder, se representa de esta manera:
	```
	plugins:
  	  - jekyll-feed
  	  - jekyll-sitemap
	```

	[En este link](https://jekyllrb.com/docs/plugins/), encontrarás información más avanzada sobre los plugins.

	- Para incluir algún archivo que no quiera ser procesado, deberá estar definido en la sección **exclude**
	```
    exclude:
      - Gemfile
      - Gemfile.lock
      - node_modules
      - vendor/
      - docs/
	```

	- Las colecciones son una excelente manera de agrupar contenido relacionado. Nuestro archivo de configuración muestra las colecciones con las que cuenta Tower Builder así:
	```
    collections_dir: collections
    collections:
      first-slider:
        output: true
      visualization-slider:
        output: true
	```

	**Importante:** Esta lista de colecciones no debe ser editada, puedes añadir colecciones, pero no borrar las que ya están de manera predeterminada.

	Para más información sobre las colecciones, [visita esta página](https://jekyllrb.com/docs/collections/).

	- Las últimas variables que se muestran dentro del archivo **_config.yml**, están relacionadas con las opciones con las que cuenta Tower Builder para mostrar los artículos:
	```
    show_excerpts: true
	future: true
	```
	
	Para conocer más sobre estas opciones visita [este link](https://jekyllrb.com/docs/posts/).

Si quieres conocer opciones más avanzadas sobre este archivo de configuración, visita la [documentación oficial de Jekyll](https://jekyllrb.com/docs/configuration/options/).
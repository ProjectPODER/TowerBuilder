# Editar la configuración

Ahora comenzarás a darle forma a tu sitio, tendrás que definir un nombre para tu proyecto y otros atributos de configuración. Para esto deberás:

1. Navegar hasta el archivo de configuración, para eso debes entrar a tu repositorio y buscar el archivo "**_config.yml**".

2. Da click en el nombre del archivo para abrirlo.

3. Da click en el botón "edit" en la parte superior derecha.

4. Comienza a cambiar valores. Este archivo está en un formato llamado YAML, esto significa que está compuesto por una serie de pares de variables con sus valores, cada línea comienza con un nombre de variable, un signo de dos puntos (:) y luego el valor.

	```
	variable: valor
	```

	No debes cambiar nunca los nombres de las variables, sólo cambiarás lo que viene después de los dos puntos.

    - Lo primero que vas a cambiar es la variable _title_, esta define el nombre que tendrá tu sitio en diferentes lugares tales como la solapa del navegador, los resultados de búsqueda y en el encabezado del sitio. Para esto busca donde dice:

	```
    title: "Tower Builder"
	```
    y cambia el valor entre comillas por el título de tu sitio, por ejemplo
	```
    title: "Análisis de contrataciones de la carretera sur".
	```

	- Otros valores importantes a cambiar son:

	```
    image: tb-logo.png -> # cambiarlo por el logo de tu proyecto o dejarlo vacío, es opcional
    description: >-
  	# Modifica el texto existente y pon la descripción de tu proyecto aquí.
	```

    - Para habilitar o deshabilitar el menú superior, cambiar entre true o false la siguiente variable:
    ```
    top_menu: true
    ```

    - Para cambiar el título del item del menú superior (aparece cuando hay varios items en el menú o cuando se ajusta la vnta a pantallas más pequeñas):
    ```
    menu_button_title: More information
    ```

	  Para cambiar el logo, sigue [estas instrucciones](https://towerbuilder.readthedocs.io/en/latest/C2/Seccion3.html#cambiar-el-logo).

	- El Grafico se puede configurar a traves de varias variables contenidas
      en `_config.yml`

	```
    graph:
        # el nombre del grafico
        title: "Nombre del gráfico"
        # los tamaños minimos y maximos de los nodos (en pixeles, aproximativo)
        sizes:
            - min: 5
            - max: 500
        # colores de nodos y connectores
        colours:
             - nodes:
                 - default: '#1ee6d3'
                 - contract: '#1ee6d3'
                 - contractTypes: '#3abdc3'
                 - contractByType: '#438a9c'
                 - organization: '#3c5a6f'
                 - shareholderPerson: '#EB639A'
                 - shareholderCorp: '#363E4E'
             - links:
                 - default: '#706F74'
                 - contractsTypes: '#706F74'
                 - toCenter: '#706F74'
                 - toContractType: '#706F74'
                 - toOrganization: '#706F74'
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

	- Las últimas variables que se muestran dentro del archivo "**_config.yml**", están relacionadas con las opciones con las que cuenta Tower Builder para mostrar los artículos:
	```
    show_excerpts: true
	future: true
	```

	Para conocer más sobre estas opciones visita [este link](https://jekyllrb.com/docs/posts/).

Si quieres conocer opciones más avanzadas sobre este archivo de configuración, visita la [documentación oficial de Jekyll](https://jekyllrb.com/docs/configuration/options/).


Para agregar analytics al sitio, puedes agregar alguna de estas opciones:

```
# Analytics Configuration
jekyll_analytics:
  GoogleAnalytics:          # Add, if you want to track with Google Analytics
    id: UA-123-456          # Required - replace with your tracking id
    anonymizeIp: false      # Optional - Default: false - set to true for anonymized tracking

  Matomo:                   # Add, if you want to track with Matomo (former Piwik Analytics)
    url: matomo.example.com # Required - url to Matomo installation without trailing /
    siteId: "1234"          # Required - replace with your Matomo site id (Write id as string)

  Piwik:                    # Add, if you want to track with Piwik
    url: piwik.example.com  # Required - url to Piwik installation without trailing /
    siteId: "1234"          # Required - replace with your Piwik site id (Write id as string)

  MPulse:                   # Add if you want to track performance with mPulse
    apikey: XXXXX-YYYYY-ZZZZZ-AAAAA-23456   # Required - replace with your mPulse API key

  Plausible:
    domain: 'example.com'   # The domain configured in plausible
    source: 'https://plausible.example.com/js/plausible.js' # The source of the javascript
```
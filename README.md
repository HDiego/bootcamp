# Bootcamp

## Para ejecutar la solución es necesario seguir los siguientes pasos:
  1-Descargar o clonar el repositorio.
  
  2-Tener Nodejs y docker instalado.
  
  3-Situarse en el directorio donde se descargo o clono el repositorio.
  
  4-Instalar los paquetes necesarios desde la linea de comando con npm install.
  
  6-Ejecutar docker-compose up -d build para crear la imagen de docker y ejecutarla.
  
  7-Desde Postman ejecutar llamadas a localhost:8889 como se muestran a continuación.
  
    Para obtener todos los registor hacer un get
    http://localhost:8889/
    
    Para obtener los registor que coinciden con el nombre deseado, hacer un get al mismo enlace donde luego de name= se ingresa el nombre deseado.
    http://localhost:8889/?name=Luis%20Suarez 
    
    Para actualizar un registro hay que hacer un put a http://localhost:8889/ y en el body de la llamada incluir un nombre y una posición, por ejemplo 
    {
    "name": "Luis Suarez",
    "position": "Forward"
    }
    Si existe el nombre actualizara el campo position, en caso contrario creara un registro nuevo.
    
    Para borrar un registro hacer un delete a http://localhost:8889/ indicando en el body el campo name deseado, ejemplo 
    {
    "name": "Luis Suarez"
    }
    Si existe un registro con el mismo nombre, este sera eliminado.

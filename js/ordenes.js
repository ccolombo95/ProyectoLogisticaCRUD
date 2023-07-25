const { createApp } = Vue;

// Crea una instancia de la aplicación Vue
createApp({
  data() {
    /* El código define una instancia de la aplicación Vue. Aquí se especifican los datos utilizados por la aplicación, incluyendo la lista de productos, la URL del backend, indicadores de error y carga, así como los atributos para almacenar los valores del formulario de producto.
     */
    return {
      seguimiento: [], // Almacena los productos obtenidos del backend
      // url:'http://localhost:5000/productos', // URL local
      url: "https://ccolombo.pythonanywhere.com/seguimiento", // URL del backend donde se encuentran los productos
      error: false,
      cargando: true,
      // Atributos para el almacenar los valores del formulario
      id: 0,
      nombre: "",
      apellido: "",
      estado: 0,
      fecha: "",
      search:"",
    };
  },
  methods: {
    searchData() {
      let search = {search: this.search,}

      fetch(url = "https://ccolombo.pythonanywhere.com/seguimiento", search)
        .then((response) => response.json()) // Convierte la respuesta en formato JSON
        .then((data) => {
          // Asigna los datos de los productos obtenidos al arreglo 'productos'
          this.seguimiento= data.filter((o) => o.nombre.toLowerCase().includes(search.search.toLowerCase()) || o.apellido.toLowerCase().includes(search.search.toLowerCase())); 
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },

    eliminar(orden) {
      /* El método eliminar toma un parámetro producto y construye la URL para eliminar ese producto en particular. Luego, realiza una solicitud fetch utilizando el método HTTP DELETE a la URL especificada. Después de eliminar el producto, la página se recarga para reflejar los cambios.
       */
      // Construye la URL para eliminar el producto especificado
      const url = this.url + "/" + orden;
      var options = {
        method: "DELETE", // Establece el método HTTP como DELETE
      };
      fetch(url, options)
        .then((res) => res.text()) // Convierte la respuesta en texto (or res.json())
        .then((res) => {
          location.reload(); // Recarga la página actual después de eliminar el producto
        });
    },
    grabar() {
      /* El método grabar se encarga de guardar los datos de un nuevo producto en el servidor. Primero, se crea un objeto producto con los datos ingresados en el formulario. Luego, se configuran las opciones para la solicitud fetch, incluyendo el cuerpo de la solicitud como una cadena JSON, el método HTTP como POST y el encabezado Content-Type como application/json. Después, se realiza la solicitud fetch a la URL especificada utilizando las opciones establecidas. Si la operación se realiza con éxito, se muestra un mensaje de éxito y se redirige al usuario a la página de productos. Si ocurre algún error, se muestra un mensaje de error.
       */
      // Crear un objeto 'producto' con los datos del formulario
      let orden = {
        nombre: this.nombre,
        apellido: this.apellido,
        estado: this.estado,
        fecha: this.fecha,
      };

      // Configurar las opciones para la solicitud fetch
      var options = {
        body: JSON.stringify(orden), // Convertir el objeto a una cadena JSON
        method: "POST", // Establecer el método HTTP como POST
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };

      // Realizar una solicitud fetch para guardar el producto en el servidor
      fetch(this.url, options)
        .then(function () {
          alert("Registro grabado!");
          window.location.href = "./seguimiento.html"; // Redirigir a la página de productos
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Grabar.");
        });
    },


  },
  created() {
    this.searchData(this.url);
  },
}).mount("#app");
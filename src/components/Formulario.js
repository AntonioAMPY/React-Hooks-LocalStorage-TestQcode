import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";

/* Componentes */
import ListadoDatos from "./ListadoDatos";
import Valor from "./Valor";
import Error from "./Error";

const Formulario = () => {
  // Nos traemos los datos del localStorage
  let datosIniciales = JSON.parse(localStorage.getItem("data")); // Convertir un array a un string
  if (!datosIniciales) {
    datosIniciales = [];
  }

  // State que me guardara el array de datos
  const [guardarResponse, setResponse] = useState(datosIniciales);

  // Cada vez que haya una actualización en el state de los datos, se renderizará nuevamente el componente
  useEffect(() => {
    let datosIniciales = JSON.parse(localStorage.getItem("data"));
    if (datosIniciales) {
      localStorage.setItem("data", JSON.stringify(guardarResponse));
    } else {
      localStorage.setItem("data", JSON.stringify(""));
    }
  }, [guardarResponse]);

  // State con los objetos
  const [guardarDatos, setGuardarDatos] = useState({
    valor: 0,
    trm: 0,
    descripcion: "",
  });

  // Extraemos los datos
  const { valor, trm, descripcion } = guardarDatos;

  // HandleChange o Guardar los datos en el objeto segun el nombre del campo
  const guardarInput = (e) => {
    setGuardarDatos({
      ...guardarDatos,
      [e.target.name]: e.target.value,
    });
  };

  // State para manejar los errores

  const [error, setError] = useState(false);

  // Enviar los datos, hacemos la peticion por http con metodo POST y hacemos las validaciones
  const Enviar = (e) => {
    e.preventDefault();

    // Validacion de los campos (Se podria manear Formik, pero el componente esta muy cargado)
    if (valor === "" || trm === "" || descripcion.trim() === "") {
      setError(true);
      return;
    }

    // Peticion http por axios, con metodo POST (Se hace copia del state para que no se reemplce con spread operator)
    axios
      .post("https://httpbin.org/post", guardarDatos)
      .then(function (response) {
        setResponse((old) => [...old, response.data.json]);
        localStorage.setItem("data", JSON.stringify(guardarResponse));
      })
      .catch(function (error) {});
  };

  return (
    <Fragment>
      <div className="row">
        <form id="formulario" className="col-6" onSubmit={Enviar}>
          <h1 className="display-4 text-left pb-2">Test Qcode</h1>
          {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
          <label>Ingrese el Valor</label>
          <Valor nombreValor="valor" guardarInput={guardarInput} value={valor}/>

          <label>Ingrese el TRM</label>
          <Valor nombreValor="trm" guardarInput={guardarInput} value={trm}/>

          <label>Seleccione por favor una opción</label>
          <select
            name="descripcion"
            className="form-control mb-3"
            onChange={guardarInput}
          >
            <option value="">---Seleccione--</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>

          <button className="btn btn-success w-25 float-left" type="submit">
            Enviar
          </button>
          <button
            className="btn btn-info w-25 float-right"
            onClick={() => {
              setGuardarDatos({
                ...guardarDatos,
                valor: 0,
                trm: 0,
                descripcion: "",
              });
            }}
            type="reset"
          >
            Limpiar
          </button>
        </form>
        <br />
        <br />
        <br />
        <div className="col-6 mt-4 pt-5">
          <ListadoDatos guardarResponse={guardarResponse} />
        </div>
      </div>
    </Fragment>
  );
};

export default Formulario;

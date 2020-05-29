import React from "react";
import Tabla from "./Tabla";

const ListadoDatos = ({ guardarResponse }) => (
  <table className="table table-bordered mt-3 text-center table-striped">
    <thead>
      <tr>
        <th className="centradoth" scope="col">
          Consecutivo
        </th>
        <th className="centradoth" scope="col">
          Valor
        </th>
        <th className="centradoth" scope="col">
          Descripción del campo seleccionado
        </th>
        <th className="centradoth" scope="col">
          TRM
        </th>
      </tr>
    </thead>
    <tbody>
      {guardarResponse && guardarResponse.map((datos, i) => (<Tabla key={i} index={i} datos={datos}/>))}
    </tbody>
  </table>
);

export default ListadoDatos;

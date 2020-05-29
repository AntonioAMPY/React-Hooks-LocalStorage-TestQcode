import React from "react";

const Tabla = ({ index, datos }) => {
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{datos.valor}</td>
      <td>{datos.descripcion}</td>
      <td>{datos.trm}</td>
    </tr>
  );
};

export default Tabla;

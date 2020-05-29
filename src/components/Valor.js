import React from 'react';
import NumberFormat from 'react-number-format';

const Valor = ({nombreValor, guardarInput, value}) => {
    return ( 
      <div>
      <NumberFormat
            className="form-control"
            value={value}
            name={nombreValor}
            thousandSeparator={"."}
            decimalSeparator={","}
            allowNegative={false}
            decimalScale={2}
            fixedDecimalScale={true}
            onChange={guardarInput}
        />
       </div>
     );
}

export default Valor;
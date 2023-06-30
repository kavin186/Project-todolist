import React from 'react';
import "./index.css";
 


function Componenent2({name,display}){
    
    return(
        <>
            <button class="buttons" onClick={display}>{name} </button>
        </>
    );
}
export default Componenent2   
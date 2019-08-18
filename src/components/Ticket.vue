<template>
  <div class="seccion">

        <div class="ticket">
            <div class="obra">
                <slot name="obra"/>
            </div>

            <div class="horario">
              <slot name="horario"/>
            </div>
            
            <div class="asientos">
              <slot name="asientos"/>
            </div>

            <div class="total">
              <slot name="total"/>
            </div>            

            <div class="slogan">
                Teatro Súper Opera - Desde 1914
            </div>

        </div>


  </div>

</template>



<style>
    
    .ticket{
        background-color: white;
        padding: 10px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.9)
    }


    .obra {
        font-weight: bold;
        font-style: oblique;
    }

    .horario {
        padding: 5px; 
        font-size: 1rem;       
    }

    .asientos{
        padding: 10px;        
    }



    .total{
        padding: 10px;       
        font-weight: bold; 
    }

    .slogan {
        padding: 10px;
        font-size: 1rem;
        font-weight: bold;
    }

</style>
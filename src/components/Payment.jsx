import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useState } from 'react';
const Payment = () => {
    
    const [orderId, setOrderId] = useState(null) 
    useEffect(() => {
      initMercadoPago(import.meta.env.VITE_PUBLIC_KEY, { locale: 'es-PE' });
    }, []);

    const createOrder = async (req, res)=>{
      try {
        const response = await axios.post(import.meta.env.VITE_API, {
            title: 'Libro Mujer de Sol',
            quantity: 1,
            unit_price: 2,
        })

        const {id} = response.data
        return id
      } catch (error) {
        console.log(error)
      }
    }

    const handleSubmit = async()=>{
      const id = await createOrder()

      if(id){
        setOrderId(id)
      }
    }
    return (
      <div>
        <h3>Libro</h3>
        <h4><strong>Precio:</strong> S/. 2.00</h4>
        <button onClick={handleSubmit}>Comprar</button>
        {orderId && <Wallet initialization={{preferenceId: orderId}} />}
        
      </div>
    );
};

export default Payment;
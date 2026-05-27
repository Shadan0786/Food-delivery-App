import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

  const {
    getTotalCartAmount,
    cartItem = {},
    food_list = [],
    url,
    token
  } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {

    const name = event.target.name
    const value = event.target.value

    setData((data) => ({
      ...data,
      [name]: value
    }))
  }

  const placeOrder = async (event) => {

    event.preventDefault()

    let orderItems = []

    food_list.forEach((item) => {

      if (
        item?._id &&
        cartItem?.[item._id] > 0
      ) {

        let itemInfo = { ...item }

        itemInfo.quantity =
          cartItem[item._id]

        orderItems.push(itemInfo)
      }
    })

    let orderData = {

      userId:
        localStorage.getItem("userId"),

      items: orderItems,

      address: data,

      amount:
        getTotalCartAmount() + 2,
    }

    try {

      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        {
          headers: {
            token,
          }
        }
      )

      if (response.data.success) {

        const order = response.data.order

        const options = {

          key: import.meta.env.VITE_RAZORPAY_KEY_ID,

          amount: order.amount,

          currency: order.currency,

          name: "Food Delivery",

          description:
            "Food Order Payment",

          order_id: order.id,

          handler: async function (
            responseData
          ) {

            const verifyResponse =
              await axios.post(
                url + "/api/order/verify",
                {
                  ...responseData,
                  orderId:
                    response.data.orderId,
                },
                {
                  headers: { token }
                }
              )

            if (
              verifyResponse.data.success
            ) {

              alert(
                "Payment Successful"
              )

            } else {

              alert(
                "Payment Failed"
              )
            }
          },

          prefill: {

            name:
              data.firstName +
              " " +
              data.lastName,

            email: data.email,

            contact: data.phone,
          },

          theme: {
            color: "#ff6347",
          },
        }

        const razorpay =
          new window.Razorpay(options)

        razorpay.open()

      } else {

        console.log(response.data)

        alert(response.data.message)
      }

    } catch (error) {

      console.log(error)

      alert("Something went wrong")
    }
  }

  return (

    <form
      className="place-order"
      onSubmit={placeOrder}
    >

      <div className="place-order-left">

        <p className='title'>
          Delivery Information
        </p>

        <div className="multi-fields">

          <input
            required
            name='firstName'
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder='First Name'
          />

          <input
            required
            name='lastName'
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder='Last Name'
          />

        </div>

        <input
          required
          name='email'
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder='Email Address'
        />

        <input
          required
          name='street'
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder='Street'
        />

        <div className="multi-fields">

          <input
            required
            name='city'
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder='City'
          />

          <input
            required
            name='state'
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder='State'
          />

        </div>

        <div className="multi-fields">

          <input
            required
            name='zipcode'
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder='Zip Code'
          />

          <input
            required
            name='country'
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder='Country'
          />

        </div>

        <input
          required
          name='phone'
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder='Phone'
        />

      </div>

      <div className="place-order-right">

        <div className='cart-bottom'>

          <div className="cart-total">

            <h2>Cart Totals</h2>

            <div>

              <div className="cart-total-details">

                <p>Subtotal</p>

                <p>
                  ${getTotalCartAmount()}
                </p>

              </div>

              <hr />

              <div className="cart-total-details">

                <p>Delivery Fee</p>

                <p>
                  $
                  {
                    getTotalCartAmount() === 0
                      ? 0
                      : 2
                  }
                </p>

              </div>

              <hr />

              <div className="cart-total-details">

                <b>Total</b>

                <b>
                  $
                  {
                    getTotalCartAmount() === 0
                      ? 0
                      : getTotalCartAmount() + 2
                  }
                </b>

              </div>

            </div>

            <button type='submit'>
              PROCEED TO PAYMENT
            </button>

          </div>

        </div>

      </div>

    </form>
  )
}

export default PlaceOrder
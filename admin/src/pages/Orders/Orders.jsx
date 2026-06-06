import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    try {

      const response = await axios.get(
        url + "/api/order/list"
      )

      console.log("FULL RESPONSE:", response.data)

      if (response.data.success) {

        setOrders(response.data.data)

        console.log(
          "ORDERS:",
          response.data.data
        )

      } else {

        toast.error(response.data.message)

      }

    } catch (error) {

      console.log(error)

      toast.error("Failed to fetch orders")

    }
  }


  const statusHandler = async (event, orderId) => {

  try {

    const response = await axios.post(
      url + "/api/order/status",
      {
        orderId,
        status: event.target.value
      }
    );

    if (response.data.success) {
      fetchAllOrders();
    }

  } catch (error) {

    console.log(error);

  }
};

  useEffect(() => {
    fetchAllOrders()
  }, [])



  return (
    <div className="orders">

      <h3>Order Page</h3>

      <h4>Total Orders: {orders.length}</h4>

      <div className="orders-list">

        {orders.length === 0 ? (

          <p>No Orders Found</p>

        ) : (

          orders.map((order, index) => (

            <div
              key={index}
              className="order-item"
            >

              <p>
                {
                  order.items?.map(
                    (item) =>
                      `${item.name} x ${item.quantity}`
                  ).join(", ")
                }
              </p>

              <p>
                {order.address?.firstName}
                {" "}
                {order.address?.lastName}
              </p>

              <p>
                {order.address?.street}
              </p>

              <p>
                ₹{order.amount}
              </p>

              <p>
                {order.payment
                  ? "Paid"
                  : "Pending"}
              </p>

              <select
                value={order.status}
                onChange={(event) =>
                  statusHandler(event, order._id)
                }
              >
                <option value="Food Processing">
                  Food Processing
                </option>

                <option value="Out for Delivery">
                  Out for Delivery
                </option>

                <option value="Delivered">
                  Delivered
                </option>
              </select>

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default Orders
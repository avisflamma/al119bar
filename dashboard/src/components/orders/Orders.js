import React from "react";
import { Link } from "react-router-dom";
import moment from "moment"; 

const Orders = (props) => {

  const orders = props.orders;

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Total</th>
          <th scope="col">Paid</th>
          <th scope="col">Date</th>
          <th>Status</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      {
        orders.map((order) => (
          <tbody key={order._id}>
            <tr>
              <td>
                <b>{order.user.name}</b>
              </td>
              <td>{order.user.email}</td>
              <td>${order.totalPrice}</td>
              <td>
                {
                  order.isPaid ? 
                  (
                    <span className="badge rounded-pill alert-success">
                      Paid At {moment(order.paidAt).format("MMM Do YY")}
                    </span>
                  )
                  : 
                  (
                    <span className="badge rounded-pill alert-info">
                      Not Paid
                    </span>
                  )
                }
               
              </td>
              <td>{moment(order.createdAt).format("MMM Do YY")}</td>
              <td>
                {
                  order.isDelivered ? 
                  (
                    <span className="badge btn-success">Delivered</span>
                  )
                  : 
                  (
                    <span className="badge btn-dark">Not Delivered</span>
                  )
                }
               
              </td>
              <td className="d-flex justify-content-end align-item-center">
                <Link to={`/order/${order._id}`} className="text-success">
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
            </tr>
            {/* Not paid Not delivered */}
          </tbody>
        ))
      }
    </table>
  );
};

export default Orders;

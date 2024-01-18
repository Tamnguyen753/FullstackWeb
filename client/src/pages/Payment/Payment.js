import React from "react";
import "./Payment.css";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
const Payment = () => {
  const navigate = useNavigate();
  const handleVnpay = () => {
    navigate("/vnpay");
  };
  const handleAtm = () => {
    navigate("/atm");
  };
  // const handleBack = () => {
  //   navigate("/seats");
  // };
  const { state } = useLocation();
  console.log("seat: ", state.seat);
  let seatNumber = "";
  for (let i = 0; i < state.seat.length; i++) {
    seatNumber = seatNumber + ", " + state.seat[i].seat;
  }
  return (
    <>
      {/* <Button onClick={handleBack} size="large">
        Quay lại
      </Button> */}
      <div className="payment">
        <div className="payment-ticket">
          <p className="payment-seat">Ghế đã chọn: {seatNumber.slice(1)}</p>
          <p className="payment-total">
            Tổng tiền cần thanh toán: {state.price}
          </p>
        </div>

        <h1>Chọn phương thức thanh toán</h1>
        <Button onClick={handleVnpay} type="primary">
          <div>
            Ví điện tử
            <span style={{ marginLeft: "10px" }}>
              <span style={{ color: "red", fontWeight: "bold" }}>VN</span>
              <span style={{ color: "blue", fontWeight: "bold" }}>PAY</span>
            </span>
          </div>
          <div>
            <img
              src="https://pay.vnpay.vn/images/icons/mics/64x64-vnpay-qr.svg"
              alt="vnpay"
            ></img>
          </div>
        </Button>
        <Button onClick={handleAtm} type="primary">
          Thẻ nội địa và tài khoản ngân hàng
          <span>
            <img
              src="https://pay.vnpay.vn/images/icons/mics/64x64-bank.svg"
              alt="vnpay"
            ></img>
          </span>
        </Button>
      </div>
    </>
  );
};

export default Payment;

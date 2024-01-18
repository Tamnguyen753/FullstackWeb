import React from 'react'

function Tickets({ bookings }) {
    return (
        <div className='detail'>
            <p><span style={{ fontSize: "20px" }}>Tên khách hàng:</span> <span style={{ color: "blue" }}>{bookings.userId}</span></p>
            <p><span style={{ fontSize: "20px" }}>Ghế đặt:</span> <span style={{ color: "blue" }}>{bookings.seatNumbers}</span></p>
            <p><span style={{ fontSize: "20px" }}>Thời gian:</span> <span style={{ color: "blue" }}>{bookings.StartAt}</span></p>
            <p><span style={{ fontSize: "20px" }}>Tên phim:</span> <span style={{ color: "blue" }}>{bookings.Movie}</span> </p>
            <p><span style={{ fontSize: "20px" }}>Tên rạp:</span> <span style={{ color: "blue" }}>{bookings.Rap}</span></p>
            <p><span style={{ fontSize: "20px" }}>Suất chiếu:</span> <span style={{ color: "blue" }}>{bookings.StartDate}</span> </p>
        </div>
    )
}

export default Tickets
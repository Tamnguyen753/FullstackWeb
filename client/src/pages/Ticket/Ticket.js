import React, { useEffect, useState } from 'react'
import "./Ticket.css";
import Tickets from './Components/Index';
import { get } from 'react-hook-form';
import axios from 'axios';
const Ticket = () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Gọi API để lấy danh sách đặt vé
                const response = await axios.get('http://127.0.0.1:8000/booking');
                console.log(response.data.data);
                // Cập nhật state với dữ liệu trả về từ API
                setBookings(response.data.data);
                // console.log(response.data.userId);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };

        // Gọi hàm fetchBookings khi component được mount
        fetchBookings();
    }, []);
    return (
        <div className='ticket'>
            {bookings.length === 0 ? <></> : <h1>Lịch sử đặt vé:</h1>}

            {/* <Tickets bookings={bookings}>
            </Tickets> */}
            <ul>
                {bookings.map((bookings) => (
                    <Tickets bookings={bookings} />
                ))}
            </ul>
        </div>
    )
}

export default Ticket
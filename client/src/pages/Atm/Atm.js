
import React, { useContext } from 'react';
import { Button, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Atm.css';
import { AppContext } from '../../App';

const Atm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { price } = useContext(AppContext)

    // const handleback = () => {
    //     navigate("/payment");
    // };

    const handleConfirm = () => {
        form
            .validateFields()
            .then(() => {
                // Nếu các trường đã được điền đầy đủ
                toast.success("Thành công !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                form.resetFields();
            })
            .catch((errorInfo) => {
                // Nếu có trường nào đó chưa được điền
                console.log('Validation Failed:', errorInfo);
                toast.error("Vui lòng điền đầy đủ thông tin!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    return (
        <>
            {/* <Button onClick={handleback} size='large'>Quay lại</Button> */}
            <div className='vnpay'>
                <div className='info'>
                    <h1>Thông tin đơn hàng</h1>
                    <span style={{ marginTop: '20px' }}>
                        <p>Số tiền thanh toán</p>
                        <p style={{ color: "#0071A9" }}><span>{price}</span> VND </p>
                    </span>
                </div>
                <div className='qr'>
                    <p>Thanh toán qua Ngân hàng</p>
                    <Form form={form}>
                        <div className='atm'>
                            <div>
                                <p>Số thẻ</p>
                                <Form.Item
                                    name="cardNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập số thẻ!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            <div>
                                <p>Ngân hàng</p>
                                <Form.Item
                                    name="bank"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên ngân hàng!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            <div>
                                <p>Tên chủ thẻ</p>
                                <Form.Item
                                    name="cardHolder"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên chủ thẻ!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            <Button onClick={handleConfirm} type='primary'>Xác nhận</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Atm;

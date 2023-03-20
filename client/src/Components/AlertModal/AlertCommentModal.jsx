import { Button, Modal } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlertCommentModal = ({ reportInfo, ele }) => {
  const token = localStorage.getItem('accessToken');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    axios.defaults.baseURL = 'http://localhost:3000';
    axios
      .post(`comments/${ele.commentId}/report`, reportInfo, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      });
    setIsModalOpen(false);
    navigate('/home');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        신고하기
      </Button>
      <Modal
        title="경고"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>신고를 접수하시겠습니까??</p>
      </Modal>
    </>
  );
};
export default AlertCommentModal;

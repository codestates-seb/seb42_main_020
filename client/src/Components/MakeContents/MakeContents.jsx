import { useState } from 'react';
import {
  SModal,
  SPostModalBlock,
  SModalWrapper,
} from '../../Style/MakeContentStyle';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loggedUserInfo } from '../../atoms/atoms';
import { notification } from 'antd';
import { BorderTopOutlined } from '@ant-design/icons';

const MakeContents = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilState(loggedUserInfo);
  console.log(userInfo[0].doctor);

  const [openMake, setOpenMake] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const reviewClickHandler = () => {
    if (userInfo[0].doctor) {
      api.info({
        message: `OOPS, SORRY`,
        description: '죄송합니다! 전문가는 게시글을 작성하실 수 없습니다.',
        placement: 'top',
      });
    } else if (!userInfo[0].isDoctor) {
      setOpenMake((prev) => !prev);
      navigate('/review');
    }
  };

  const questionClickHandler = () => {
    if (userInfo[0].doctor) {
      api.info({
        message: `OOPS, SORRY`,
        description: '죄송합니다! 전문가는 게시글을 작성하실 수 없습니다.',
        placement: 'top',
      });
    } else if (!userInfo[0].isDoctor) {
      setOpenMake((prev) => !prev);
      navigate('/askquestion');
    }
  };

  // 모달 창 상태 관리
  const modalHandler = () => {
    setOpenMake((prev) => !prev);
  };

  return (
    <div className="modal_wrapper">
      {contextHolder}
      <SPostModalBlock>
        <button onClick={modalHandler}>리뷰 / 질문 작성하기</button>
        {openMake && (
          <SModalWrapper>
            <SModal>
              <div>
                <button
                  type="primary"
                  onClick={reviewClickHandler}
                  icon={<BorderTopOutlined />}
                >
                  리뷰 작성하기
                </button>
                <button
                  type="primary"
                  onClick={questionClickHandler}
                  icon={<BorderTopOutlined />}
                >
                  질문 작성하기
                </button>
              </div>
              <button onClick={modalHandler}>닫 기</button>
            </SModal>
          </SModalWrapper>
        )}
      </SPostModalBlock>
    </div>
  );
};

export default MakeContents;

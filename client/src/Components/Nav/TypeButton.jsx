import { SNavContents } from '../../Style/NavStyle';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';

const TypeButton = () => {
  const items = [
    {
      key: '1',
      label: <Link to="/home/subject/1">치과</Link>,
    },
    {
      key: '2',
      label: <a href="/home/subject/2">안과</a>,
    },
    {
      key: '3',
      label: <a href="/home/subject/3">피부과</a>,
    },
    {
      key: '4',
      label: <a href="/home/subject/4">성형외과</a>,
    },
    {
      key: '5',
      label: <a href="/home/subject/5">산부인과</a>,
    },
    {
      key: '6',
      label: <a href="/home/subject/6">정신건강의학과</a>,
    },
    {
      key: '7',
      label: <a href="/home/subject/7">비뇨기과</a>,
    },
    {
      key: '8',
      label: <a href="/home/subject/8">정형외과</a>,
    },
    {
      key: '9',
      label: <a href="/home/subject/9">마취통증의학과</a>,
    },
    {
      key: '10',
      label: <a href="/home/subject/10">신경외과</a>,
    },
    {
      key: '11',
      label: <a href="/home/subject/11">재활의학과</a>,
    },
    {
      key: '12',
      label: <a href="/home/subject/12">영상의학과</a>,
    },
    {
      key: '13',
      label: <a href="/home/subject/13">외과</a>,
    },
    {
      key: '14',
      label: <a href="/home/subject/14">신경과</a>,
    },
    {
      key: '15',
      label: <a href="/home/subject/15">소아과</a>,
    },
    {
      key: '16',
      label: <a href="/home/subject/16">내과</a>,
    },
    {
      key: '17',
      label: <a href="/home/subject/17">이빈후과</a>,
    },
    {
      key: '18',
      label: <a href="/home/subject/18">가정의학과</a>,
    },
    {
      key: '19',
      label: <a href="/home/subject/19">한의원</a>,
    },
    {
      key: '20',
      label: <a href="/home/subject/20">기타</a>,
    },
  ];

  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
      >
        <SNavContents onClick={(e) => e.preventDefault()}>
          <Link to="/home/subject/1">과목별</Link>
        </SNavContents>
      </Dropdown>
    </>
  );
};

export default TypeButton;

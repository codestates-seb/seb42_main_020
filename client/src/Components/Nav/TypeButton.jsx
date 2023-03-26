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
      label: <Link to="/home/subject/2">안과</Link>,
    },
    {
      key: '3',
      label: <Link to="/home/subject/3">피부과</Link>,
    },
    {
      key: '4',
      label: <Link to="/home/subject/4">성형외과</Link>,
    },
    {
      key: '5',
      label: <Link to="/home/subject/5">산부인과</Link>,
    },
    {
      key: '6',
      label: <Link to="/home/subject/6">정신건강의학과</Link>,
    },
    {
      key: '7',
      label: <Link to="/home/subject/7">비뇨기과</Link>,
    },
    {
      key: '8',
      label: <Link to="/home/subject/8">정형외과</Link>,
    },
    {
      key: '9',
      label: <Link to="/home/subject/9">마취통증의학과</Link>,
    },
    {
      key: '10',
      label: <Link to="/home/subject/10">신경외과</Link>,
    },
    {
      key: '11',
      label: <Link to="/home/subject/11">재활의학과</Link>,
    },
    {
      key: '12',
      label: <Link to="/home/subject/12">영상의학과</Link>,
    },
    {
      key: '13',
      label: <Link to="/home/subject/13">외과</Link>,
    },
    {
      key: '14',
      label: <Link to="/home/subject/14">신경과</Link>,
    },
    {
      key: '15',
      label: <Link to="/home/subject/15">소아과</Link>,
    },
    {
      key: '16',
      label: <Link to="/home/subject/16">내과</Link>,
    },
    {
      key: '17',
      label: <Link to="/home/subject/17">이빈후과</Link>,
    },
    {
      key: '18',
      label: <Link to="/home/subject/18">가정의학과</Link>,
    },
    {
      key: '19',
      label: <Link to="/home/subject/19">한의원</Link>,
    },
    {
      key: '20',
      label: <Link to="/home/subject/20">기타</Link>,
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
          <Link to="/home/subject">과목별</Link>
        </SNavContents>
      </Dropdown>
    </>
  );
};

export default TypeButton;

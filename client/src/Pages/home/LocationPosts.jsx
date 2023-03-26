import { Link } from 'react-router-dom';
import Section from '../../Components/Section/Section';

function LocationPosts() {
  const currentPath = window.location.href;
  return <Section path={currentPath} />;
}
export const items = [
  {
    key: '1',
    label: <Link to="/home/location/1">강남구</Link>,
  },
  {
    key: '2',
    label: <Link to="/home/location/2">강서구</Link>,
  },
  {
    key: '3',
    label: <Link to="/home/location/3">강북구</Link>,
  },
  {
    key: '4',
    label: <Link to="/home/location/4">용산구</Link>,
  },
  {
    key: '5',
    label: <Link to="/home/location/5">관악구</Link>,
  },
  {
    key: '6',
    label: <Link to="/home/location/6">중구</Link>,
  },
  {
    key: '7',
    label: <Link to="/home/location/7">서초구</Link>,
  },
  {
    key: '8',
    label: <Link to="/home/location/8">송파구</Link>,
  },
  {
    key: '9',
    label: <Link to="/home/location/9">마포구</Link>,
  },
  {
    key: '10',
    label: <Link to="/home/location/10">서대문구</Link>,
  },
  {
    key: '11',
    label: <Link to="/home/location/11">성동구</Link>,
  },
  {
    key: '12',
    label: <Link to="/home/location/12">은평구</Link>,
  },
  {
    key: '13',
    label: <Link to="/home/location/13">동대문구</Link>,
  },
  {
    key: '14',
    label: <Link to="/home/location/14">동작구</Link>,
  },
  {
    key: '15',
    label: <Link to="/home/location/15">노원구</Link>,
  },
  {
    key: '16',
    label: <Link to="/home/location/16">도봉구</Link>,
  },
  {
    key: '17',
    label: <Link to="/home/location/17">영등포구</Link>,
  },
  {
    key: '18',
    label: <Link to="/home/location/18">중랑구</Link>,
  },

  {
    key: '19',
    label: <Link to="/home/location/19">금천구</Link>,
  },
  {
    key: '20',
    label: <Link to="/home/location/20">광진구</Link>,
  },
  {
    key: '21',
    label: <Link to="/home/location/21">성북구</Link>,
  },
  {
    key: '22',
    label: <Link to="/home/location/22">구로구</Link>,
  },
];

export default LocationPosts;

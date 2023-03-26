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
];

export default LocationPosts;

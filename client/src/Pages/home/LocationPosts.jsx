import { Link } from 'react-router-dom';
import Section from '../../Components/Section/Section';

function LocationPosts() {
  const currentPath = window.location.href;
  return <Section path={currentPath} />;
}
export const items = [
  {
    key: '1',
    label: <Link to="home/location/1">강남구</Link>,
  },
  {
    key: '2',
    label: <a href="/home/location/2">강서구</a>,
  },
  {
    key: '3',
    label: <a href="/home/location/3">강북구</a>,
  },
  {
    key: '4',
    label: <a href="/home/location/4">용산구</a>,
  },
  {
    key: '5',
    label: <a href="/home/location/5">관악구</a>,
  },
  {
    key: '6',
    label: <a href="/home/location/6">중구</a>,
  },
  {
    key: '7',
    label: <a href="/home/location/7">서초구</a>,
  },
  {
    key: '8',
    label: <a href="/home/location/8">송파구</a>,
  },
  {
    key: '9',
    label: <a href="/home/location/9">마포구</a>,
  },
  {
    key: '10',
    label: <a href="/home/location/10">서대문구</a>,
  },
  {
    key: '11',
    label: <a href="/home/location/11">성동구</a>,
  },
  {
    key: '12',
    label: <a href="/home/location/12">은평구</a>,
  },
  {
    key: '13',
    label: <a href="/home/location/13">동대문구</a>,
  },
  {
    key: '14',
    label: <a href="/home/location/14">동작구</a>,
  },
  {
    key: '15',
    label: <a href="/home/location/15">노원구</a>,
  },
  {
    key: '16',
    label: <a href="/home/location/16">도봉구</a>,
  },
  {
    key: '17',
    label: <a href="/home/location/17">영등포구</a>,
  },
  {
    key: '18',
    label: <a href="/home/location/18">중랑구</a>,
  },

  {
    key: '19',
    label: <a href="/home/location/19">금천구</a>,
  },
  {
    key: '20',
    label: <a href="/home/location/20">광진구</a>,
  },
  {
    key: '21',
    label: <a href="/home/location/21">성북구</a>,
  },
  {
    key: '22',
    label: <a href="/home/location/22">구로구</a>,
  },
];

export default LocationPosts;

import { SectionStyle } from '../../Style/SectionStyle';
import PostTopic from './PostTopic';
import Category from './Category';
import PostSearch from './PostSearch';

function Section({ path }) {
  const pathFiltered = path.slice(path.indexOf('/home'));
  let topicName = '';

  switch (pathFiltered) {
    case '/home':
      topicName = '전체';
      break;
    case '/home/question':
      topicName = '질문';
      break;
    case '/home/review':
      topicName = '리뷰';
      break;
    //지역별
    case '/home/location/1':
      topicName = '강남구';
      break;
    case '/home/location/2':
      topicName = '강서구';
      break;
    case '/home/location/3':
      topicName = '강북구';
      break;
    case '/home/location/4':
      topicName = '용산구';
      break;
    case '/home/location/5':
      topicName = '관악구';
      break;
    case '/home/location/6':
      topicName = '중구';
      break;
    case '/home/location/7':
      topicName = '서초구';
      break;
    case '/home/location/8':
      topicName = '송파구';
      break;
    case '/home/location/9':
      topicName = '마포구';
      break;
    case '/home/location/10':
      topicName = '서대문구';
      break;
    case '/home/location/11':
      topicName = '성동구';
      break;
    case '/home/location/12':
      topicName = '은평구';
      break;
    case '/home/location/13':
      topicName = '동대문구';
      break;
    case '/home/location/14':
      topicName = '동작구';
      break;
    case '/home/location/15':
      topicName = '노원구';
      break;
    case '/home/location/16':
      topicName = '도봉구';
      break;
    case '/home/location/17':
      topicName = '영등포구';
      break;
    case '/home/location/18':
      topicName = '중랑구';
      break;
    case '/home/location/19':
      topicName = '금천구';
      break;
    case '/home/location/20':
      topicName = '광진구';
      break;
    case '/home/location/21':
      topicName = '성북구';
      break;
    case '/home/location/22':
      topicName = '구로구';
      break;

    //과목별
    case '/home/subject/1':
      topicName = '치과';
      break;
    case '/home/subject/2':
      topicName = '안과';
      break;
    case '/home/subject/3':
      topicName = '피부과';
      break;
    case '/home/subject/4':
      topicName = '성형외과';
      break;
    case '/home/subject/5':
      topicName = '산부인과';
      break;
    case '/home/subject/6':
      topicName = '정신건강의학과';
      break;
    case '/home/subject/7':
      topicName = '비뇨기과';
      break;
    case '/home/subject/8':
      topicName = '정형외과';
      break;
    case '/home/subject/9':
      topicName = '마취통증의학과';
      break;
    case '/home/subject/10':
      topicName = '신경외과';
      break;
    case '/home/subject/11':
      topicName = '재활의학과';
      break;
    case '/home/subject/12':
      topicName = '영상의학과';
      break;
    case '/home/subject/13':
      topicName = '외과';
      break;
    case '/home/subject/14':
      topicName = '신경과';
      break;
    case '/home/subject/15':
      topicName = '소아과';
      break;
    case '/home/subject/16':
      topicName = '내과';
      break;
    case '/home/subject/17':
      topicName = '이빈후과';
      break;
    case '/home/subject/18':
      topicName = '가정의학과';
      break;
    case '/home/subject/19':
      topicName = '한의원';
      break;
    case '/home/subject/20':
      topicName = '기타';
      break;
  }

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SectionStyle>
        <PostTopic topicName={topicName} />
        <Category topicName={topicName} />
        <PostSearch topicName={topicName} />
      </SectionStyle>
    </section>
  );
}

export default Section;

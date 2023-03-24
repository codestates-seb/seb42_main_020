import SectionStyle from '../../Style/SectionStyle';
import PostTopic from './PostTopic';
import Category from './Category';
import PostSearch from './PostSearch';
import { useState } from 'react';

function Section() {
  const [path, setPath] = useState(window.location.href);

  console.log(setPath);
  console.log(path);

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SectionStyle>
        <PostTopic path={path} />
        <Category path={path} />
        <PostSearch path={path} />
      </SectionStyle>
    </section>
  );
}

export default Section;

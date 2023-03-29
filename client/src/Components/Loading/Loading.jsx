import styled from 'styled-components';

const SLayout = styled.div`
  width: 1920px;
  height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <SLayout>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
        alt="loading"
      />
    </SLayout>
  );
};

export default Loading;

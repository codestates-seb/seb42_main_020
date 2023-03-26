import styled from 'styled-components';

const PostCategoryStyle = styled.ul`
  font-family: 'TheJamsil5Bold';
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  margin-top: 10px;
  padding: 20px 10px;
  background: #ebfff7;
  border-top: 3px solid #00663b;
  border-bottom: 1px solid #00663b;

  li {
    font-weight: bold;
    font-size: 20px;
  }

  .number {
    flex: 0.3;
  }
  .subject {
    flex: 0.8;
  }
  .doctor {
    flex: 0.7;
    font-size: 16px;
  }
  .title {
    flex: 3;
  }
  .nickname {
    flex: 1;
  }
  .area {
    flex: 0.5;
  }
  .type {
    flex: 0.6;
  }
  .time {
    flex: 0.6;
  }
  .like {
    flex: 0.3;
  }
`;

export default PostCategoryStyle;

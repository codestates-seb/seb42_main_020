import styled from 'styled-components';

const UserPostCategoryStyle = styled.ul`
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 20px 10px;
  background: #ebfff7;
  border-bottom: 1px solid #d6d6d6;

  li {
    font-weight: bold;
    font-size: 14px;
  }

  .number {
    flex: 0.3;
  }
  .subject {
    flex: 0.8;
  }
  .doctor {
    flex: 0.7;
    font-size: 12px;
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

export default UserPostCategoryStyle;

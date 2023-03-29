import styled from 'styled-components';

const PostListStyle = styled.ul`
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  margin-top: 2px;
  padding: 15px 10px;
  border-bottom: 1px solid #d6d6d6;
  font-weight: 500;
  color: var(--gray-800);
  a {
    text-decoration: none;
    color: var(--gray-800);
  }
  .number {
    flex: 0.3;
  }
  .subject {
    flex: 0.8;
    /* font-size: 12px; */
  }
  .doctor {
    flex: 0.7;
  }
  .title {
    flex: 3;
    text-align: initial;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .title div {
    padding: 5px 20px;
  }
  .title div:hover {
    color: crimson;
  }
  .nickname {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 5px 0;
  }
  .area {
    flex: 0.5;
  }
  .type {
    flex: 0.6;
  }
  .type > span {
    padding: 5px 7px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
      rgb(209, 213, 219) 0px 0px 0px 1px inset;
    border-radius: 5px;
  }
  .question {
    color: #ffffff;
    background: #00663b;
  }
  .review {
    color: #ffffff;
    background: #173ea1;
  }
  .time {
    flex: 0.6;
  }
  .like {
    flex: 0.3;
  }
`;

export default PostListStyle;

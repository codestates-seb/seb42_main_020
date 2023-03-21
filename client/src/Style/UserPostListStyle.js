import styled from 'styled-components';

const PostListStyle = styled.ul`
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  margin-top: 2px;
  padding: 15px 10px;
  border-bottom: 1px solid #d6d6d6;
  .number {
    flex: 0.3;
  }
  .subject {
    flex: 0.8;
  }
  .doctor {
    flex: 0.7;
  }
  .title {
    flex: 3.5;
    text-align: initial;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .title > span {
    padding: 0px 20px;
  }
  .nickname {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
    font-size: 14px;
  }
  .like {
    flex: 0.3;
  }
`;

export default PostListStyle;

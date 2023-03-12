import styled from 'styled-components';

const PostTopicStlye = styled.div`
  padding: 0px 20px;
  h2 {
    font-size: 30px;
    font-weight: bold;
  }
  .topicTemplate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  .create-post {
    margin-left: 20px;
    padding: 5px 30px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    background-color: #ffffff;
    border: 2px solid #858585;
  }
  .create-post:hover {
    border: px solid #333333;
    background-color: #333333;
    color: #ffffff;
    box-shadow: none;
  }
`;

export default PostTopicStlye;

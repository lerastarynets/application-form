import styled from "styled-components";

export default styled.button`
  background-color: transparent;
  border: 1px solid #222222;
  border-radius: 8px;
  box-sizing: border-box;
  color: #222222;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  outline: none;
  padding: 13px 23px;
  margin-bottom: 20px;
  text-align: center;
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
    transform 0.1s;
  &:disabled {
    background-color: lightgrey;
    opacity: 0.7;
    border: none;
    cursor: auto;
    color: dimgrey;
  }
`;

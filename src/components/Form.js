import styled from "styled-components";

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = ({ children }) => {
  return <StyledForm>{children}</StyledForm>;
};
export default Form;

import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 450px;
  min-height: 500px;
  height: auto;
  border-radius: 5px;
  margin: 2% auto;
  box-shadow: 0 9px 50px hsla(20, 67%, 75%, 0.31);
  padding: 2%;
  background-image: linear-gradient(
    -225deg,
    #e3fdf5 50%,
    #ffe6fa 50%
  );
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
  > input {
    margin-bottom: 0.2rem;
  }
`;

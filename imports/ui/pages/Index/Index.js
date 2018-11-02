import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { lighten, darken } from 'polished';

const StyledIndex = styled.div`
  padding: 20px;
  background: var(--cb-blue);
  text-align: center;
  border-radius: 3px;
  color: #fff;

  img {
    width: auto;
    height: auto;
  }

  h1 {
    font-size: 28px;
  }

  p {
    font-size: 18px;
    color: ${lighten(0.25, '#4285F4')};
  }

  > div {
    display: inline-block;
    margin: 10px 0 0;

    .btn:first-child {
      margin-right: 10px;
    }

    .btn {
      border: none;
    }
  }

  footer {
    margin: 20px -20px -20px;
    border-top: 1px solid ${darken(0.1, '#4285F4')};
    padding: 20px;

    p {
      font-size: 14px;
      line-height: 22px;
      color: ${lighten(0.35, '#4285F4')};
      margin: 0;
    }

    p a {
      color: ${lighten(0.35, '#4285F4')};
      text-decoration: underline;
    }
  }

  @media screen and (min-width: 768px) {
    padding: 30px;

    footer {
      margin: 30px -30px -30px;
    }
  }

  @media screen and (min-width: 992px) {
    padding: 40px;

    footer {
      margin: 40px -40px -40px;
    }
  }
`;


const Index = () => (
  <StyledIndex>
    <img
      src="https://pp.userapi.com/c847017/v847017560/114ae0/b5o_pIlUnCQ.jpg"
      alt="Nurorda"
    />
    <h1>Nurorda Fantasy</h1>
    <p>Football fantasy of Nurorda.</p>
    <div>
      <Button href="https://nurorda.kz/">School page</Button>
      <Button href="https://google.kz/"><i className="fa fa-star" />Leave a feedback!</Button>
    </div>
    <footer>
      <p></p>
    </footer>
  </StyledIndex>
);

export default Index;

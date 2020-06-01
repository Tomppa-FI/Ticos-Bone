import styled from "styled-components";

const textColor = `#e5e6df`;

export const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: ${textColor};
  margin: 2.5%;
  letter-spacing: 1.5px;
`

export const Paragraph = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: ${textColor};
  margin: 1% 8%;
  line-height: 160%;
`;

export const BaseText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: ${textColor};
`;

export const StyledA = styled.a`
  color: white;
  font-weight: 400;
  text-decoration: none;
`;
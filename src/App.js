import React from 'react';
import ChartContainer from './ChartContainer';
import styled from 'styled-components';

function App() {
  return (
    <AppWrapper>
        <ChartContainer />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  max-width: 1170px; 
  margin: 0 auto;
`
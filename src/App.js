
import Map02 from './MapsModels/Map'
import ExternalStateExample from './MapsModels/Maps02'
import styled from 'styled-components'

function App() {
  return (
    <Container >
      <Map02 />
      <ExternalStateExample/>
    </Container>
  );
}


const Container = styled.div`
  margin:0;
  display:flex;
  flex-direction: column;
  gap:20px;
`


export default App;

//simport { useEffect, useRef } from 'react';
import BlocklyEditor from './BlocklyEditor'

function App() {
  window.vm = {
    runtime: {
      
    }
  }
  return (
    <div>
      <BlocklyEditor />
    </div>
  );
}

export default App;

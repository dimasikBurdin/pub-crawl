import { useCallback, useEffect, useRef } from "react";
import styles from "./app.module.css";
import { ContextContainer } from "./providers/context-container";

function App() {
  return (
    <ContextContainer>
      <div className="App">
        <div id="map" className={styles.map} />
      </div>
    </ContextContainer>
  );
}

export default App;

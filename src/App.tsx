import { useCallback, useEffect, useRef } from "react";
import styles from "./app.module.css";

function App() {
  const mapRef = useRef<HTMLDivElement>(null);

  const init = useCallback(async () => {
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer } = ymaps3;

    // Иницилиазируем карту
    const map = new YMap(
      // Передаём ссылку на HTMLElement контейнера
      mapRef.current!,

      // Передаём параметры инициализации карты
      {
        location: {
          // Координаты центра карты
          center: [60.597474, 56.838011],

          // Уровень масштабирования
          zoom: 14,
        },
      }
    );

    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer({}));
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      <div ref={mapRef} id="map" className={styles.map} />
    </div>
  );
}

export default App;

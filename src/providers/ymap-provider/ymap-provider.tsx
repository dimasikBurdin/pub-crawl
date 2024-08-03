import { YMap, YMapControlButton, YMapControls } from "@yandex/ymaps3-types";
import React, { useEffect, useState } from "react";
import { FC, PropsWithChildren, createContext, useCallback } from "react";
import ReactDOM from "react-dom";

interface YMapComponents {
  map: YMap;
}

export const YMapContext = createContext<YMapComponents | null>(null);

export const YMapProvider: FC<PropsWithChildren> = ({ children }) => {
  const [components, setComponents] = useState<YMapComponents | null>(null);

  const init = useCallback(async () => {
    await ymaps3.ready;
    const { YMapDefaultMarker } = await ymaps3.import(
      "@yandex/ymaps3-markers@0.0.1"
    );

    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapControls,
      YMapControlButton,
    } = ymaps3;

    // Иницилиазируем карту
    const map = new YMap(
      // Передаём ссылку на HTMLElement контейнера
      document.getElementById("map")!,

      // Передаём параметры инициализации карты
      {
        location: {
          // Координаты центра карты
          center: [60.597474, 56.838011],

          // Уровень масштабирования
          zoom: 14,
        },
      },
      [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})]
    );

    const onCLick = () => {
      ymaps3.search({ text: "Екатеринбург ставников" }).then((res) =>
        res.forEach(({ geometry, properties: { name } }) => {
          map.addChild(
            new YMapDefaultMarker({
              coordinates: geometry?.coordinates!,
              title: name,
            })
          );
          setComponents({ map });
        })
      );
      ymaps3.search({ text: "Екатеринбург фьорд" }).then((res) =>
        res.forEach(({ geometry, properties: { name } }) => {
          map.addChild(
            new YMapDefaultMarker({
              coordinates: geometry?.coordinates!,
              title: name,
              color: "green",
            })
          );
          setComponents({ map });
        })
      );
    };

    const controls = new YMapControls({ position: "top left" }, [
      new YMapControlButton({
        text: "<div>search</div>",
        // onClick: () =>
        //   map.addChild(new YMapMarker({ coordinates: [60.597474, 56.838011] })),
        onClick: onCLick,
      }),
    ]);

    map.addChild(controls);

    setComponents({ map });
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <YMapContext.Provider value={components}>{children}</YMapContext.Provider>
  );
};

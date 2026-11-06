import React from "react";
import { Composition, Folder, Still } from "remotion";
import { Centro } from "./scenes/Centro";
import { Prologo } from "./scenes/Prologo";
import { SeisFiguras } from "./scenes/SeisFiguras";
import { Uniformar } from "./scenes/Uniformar";

// Cuatro momentos clave de la Bóveda de Ortega, hechos con las piezas de la web.
export const RemotionRoot: React.FC = () => (
  <Folder name="Boveda">
    <Composition id="Prologo" component={Prologo} durationInFrames={360} fps={30} width={1280} height={720} />
    <Composition id="SeisFiguras" component={SeisFiguras} durationInFrames={270} fps={30} width={1280} height={720} />
    <Composition id="Uniformar" component={Uniformar} durationInFrames={210} fps={30} width={1280} height={720} />
    <Composition id="Centro" component={Centro} durationInFrames={270} fps={30} width={1280} height={720} />
    <Still id="Poster" component={Prologo} width={1280} height={720} />
  </Folder>
);

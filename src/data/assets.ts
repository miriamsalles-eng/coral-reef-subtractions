import fishGroup10 from "@/assets/fish-group-10.png.asset.json";
import fishTurquoise from "@/assets/fish-turquoise.png.asset.json";
import fishYellow from "@/assets/fish-yellow.png.asset.json";
import seahorse from "@/assets/seahorse.png.asset.json";
import starfish from "@/assets/starfish.png.asset.json";

import bgActivity from "@/assets/bg-activity.png.asset.json";
import bgFinal from "@/assets/bg-final.png.asset.json";
import bgReflection from "@/assets/bg-reflection.png.asset.json";
import bgTransitionCave from "@/assets/bg-transition-cave.png.asset.json";
import bgTransitionTen from "@/assets/bg-transition-ten.png.asset.json";
import coverTitle from "@/assets/cover-title.png.asset.json";

import btnAudio from "@/assets/btn-audio.png.asset.json";
import btnBack from "@/assets/btn-back.png.asset.json";
import btnHint from "@/assets/btn-hint.png.asset.json";
import btnNext from "@/assets/btn-next.png.asset.json";
import btnRestart from "@/assets/btn-restart.png.asset.json";
import btnStart from "@/assets/btn-start.png.asset.json";

import cave from "@/assets/cave.png.asset.json";
import coral from "@/assets/coral.png.asset.json";
import rocks from "@/assets/rocks.png.asset.json";
import seaweed from "@/assets/seaweed.png.asset.json";
import shell from "@/assets/shell.png.asset.json";

import maraCelebrating from "@/assets/mara-celebrating.png.asset.json";
import maraFeedback from "@/assets/mara-feedback.png.asset.json";
import maraNeutral from "@/assets/mara-neutral.png.asset.json";
import maraPointing from "@/assets/mara-pointing.png.asset.json";
import maraPresenting from "@/assets/mara-presenting.png.asset.json";
import maraPresenting1 from "@/assets/mara-presenting1.png.asset.json";
import maraThinking from "@/assets/mara-thinking.png.asset.json";

/** Todos os assets pertencem exclusivamente a este projeto. */
export const ANIMALS = {
  "fish-yellow": { url: fishYellow.url, alt: "Peixe amarelo", ratio: 756 / 556 },
  "fish-turquoise": { url: fishTurquoise.url, alt: "Peixe azul-turquesa", ratio: 840 / 567 },
  seahorse: { url: seahorse.url, alt: "Cavalo-marinho", ratio: 551 / 1252 },
  starfish: { url: starfish.url, alt: "Estrela-do-mar", ratio: 879 / 821 },
} as const;

export type AnimalKey = keyof typeof ANIMALS;

export const GROUP_OF_TEN = {
  url: fishGroup10.url,
  alt: "Grupo de 10 peixes nadando juntos",
  ratio: 891 / 882,
};

export const BACKGROUNDS = {
  cover: coverTitle.url,
  activity: bgActivity.url,
  ten: bgTransitionTen.url,
  cave: bgTransitionCave.url,
  reflection: bgReflection.url,
  final: bgFinal.url,
} as const;

export type BackgroundKey = keyof typeof BACKGROUNDS;

export const BUTTONS = {
  start: btnStart.url,
  next: btnNext.url,
  back: btnBack.url,
  restart: btnRestart.url,
  audio: btnAudio.url,
  hint: btnHint.url,
} as const;

export const SCENERY = {
  cave: cave.url,
  coral: coral.url,
  rocks: rocks.url,
  seaweed: seaweed.url,
  shell: shell.url,
} as const;

export const MARA_POSES = {
  neutral: maraNeutral.url,
  presenting: maraPresenting.url,
  presenting1: maraPresenting1.url,
  pointing: maraPointing.url,
  thinking: maraThinking.url,
  feedback: maraFeedback.url,
  celebrating: maraCelebrating.url,
} as const;

export type MaraPose = keyof typeof MARA_POSES;

/** Proporção largura/altura de cada pose, para nunca deformar o PNG. */
export const MARA_RATIO: Record<MaraPose, number> = {
  neutral: 776 / 1125,
  presenting: 868 / 1064,
  presenting1: 805 / 1088,
  pointing: 825 / 1048,
  thinking: 758 / 1136,
  feedback: 837 / 856,
  celebrating: 814 / 1083,
};

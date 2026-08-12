/**
 * Mapa de narração das falas de Mara.
 *
 * Estrutura pronta para receber arquivos MP3 (voz infantil feminina em
 * português brasileiro). Enquanto os arquivos não existem, o valor fica `null`
 * e a narração usa a síntese de voz do navegador em pt-BR — nunca uma voz
 * adulta distorcida para imitar criança.
 *
 * Para ativar um MP3, basta trocar o `null` pela URL do áudio.
 */
export const NARRATION: Record<string, string | null> = {
  "intro.apresentacao": null,
  "tutorial.observar": null,
  "tutorial.pergunta": null,
  "tutorial.numeros": null,
  "fase1.d1": null,
  "fase1.d2": null,
  "fase1.d3": null,
  "fase1.grupo10": null,
  "fase1.d4": null,
  "fase1.d5": null,
  "transicao": null,
  "fase2.s6": null,
  "fase2.s7": null,
  "fase2.s8": null,
  "sintese": null,
  "meta.q1": null,
  "meta.q2": null,
  "final": null,
};

export function narrationUrl(id?: string): string | null {
  if (!id) return null;
  return NARRATION[id] ?? null;
}

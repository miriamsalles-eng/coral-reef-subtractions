import { useCallback, useEffect, useRef } from "react";

/**
 * Centraliza todos os timers de animação da atividade.
 *
 * `clearInteractionTimers()` deve ser chamado ao avançar, voltar, reiniciar,
 * repetir a animação, trocar de fase e ao desmontar o componente. Assim,
 * nenhum timer de uma tela anterior consegue alterar a tela seguinte.
 */
export function useInteractionTimers() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearInteractionTimers = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  }, []);

  const after = useCallback((ms: number, fn: () => void) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  useEffect(() => clearInteractionTimers, [clearInteractionTimers]);

  return { after, clearInteractionTimers };
}

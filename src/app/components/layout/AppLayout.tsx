import { Header } from "./header/Header";
import { Sidebar } from "./sidebar/Sidebar";
import "./AppLayout.css";
import { Outlet } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";

export type FavoritesOutletContext = {
  favoriteToolIds: string[];
  toggleFavorite: (toolId: string) => void;
};

export const AppLayout = () => {

  // DESSA FORMA CONSEGUIMOS COLOCAR UM ELEMENTO DE TELA EM ESTADO -- PARA QUE DUAS PÁGINAS TENHAM ACESSO SEM PRECISAR
  // FAZER O MESMO PROCESSO QUE AMBOS PRECISARIAM FAZER...
  const [favoriteToolIds, setFavoriteToolIds] = useState<string[]>([]);

  const toggleFavorite = useCallback((toolId: string) => {
    setFavoriteToolIds((prev) => {
      const exists = prev.includes(toolId);
      return exists ? prev.filter((id) => id !== toolId) : [...prev, toolId];
    });
  }, []);


  // COLOCAMOS NOSSO ESTADO EM UM CONTEXTO PARA NOSSAS PAGINAS QUE RENDERIZAM NO OUTLET...
  // ISSO AQUI ELIMINA A NECESSIDA DE FICAR PASSANDO PROPS...
  const outletContext = useMemo(() => // useMemo nos protege de ficar criando objetos a cada render.
    ({ favoriteToolIds, toggleFavorite }), // dessa forma, mesmo que não tivessemos um novo favorito cria-se um novo obj.
    [favoriteToolIds, toggleFavorite],
  );

  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main> 
        {/* Durante as navegações apenas aqui que renderiza na aplicação */}
        <Outlet context={outletContext} />
      </main>
    </div>
  );
};

/*
    - Para que serve o outlet context:
    -------------------------------------
      - Para passar dados ou funções, do layout pai para as rotas filhas.
        - Sem a necessidade de prop drilling ('cascata de props').

      - É útil quando preciamos compartilhar estados (ex: favoritos), ações ('toggleFavorite') e configs ('temas, permissões').


    - Por que não devemos editar ou 'mutar' dos dados dos nosso JSONs vindos do backend
    ---------------------------------------------------------------------------------------
      - Transformamos nosso JSON em um estado global e perdemos a separação entre dois pontos fundamentais:
        - Dados originais.
        - Preferências do usuário (ex: favoritos).

      - Lembrança: Dados originais são imutáveis, e a UI é um state separado.
*/

/*
    - Quando devemos usar o useState:
    -----------------------------------
      - Quando precisamos que algo na UI mude com interação/tempo de uso.
      - Quando a mudança causa por algum motivo citado acima precisar causar re-render na UI.


    - Quando devemos usar o useCallback:
    -------------------------------------
      - Para memorizar funções, mantendo a mesma referência independente dos renders da UI.
      - Quando vamos passar funções por props/context.
      - Quando nos importamos com estabilida/re-render.

    
    - Quando devemos usar o useMemo:
    -------------------------------------
      - Quando criamos um obj/arrays e vamos passar isso como prop/context.
      - Além de querer evitar 'mudanças falsas'.
*/
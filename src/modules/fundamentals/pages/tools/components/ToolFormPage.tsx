import { X } from "lucide-react";
import { ToolForm, ToolFormValues } from "./ToolForm";

type ToolFormPageMode = "create" | "edit";

type ToolFormPageProps = {
  open: boolean;
  mode: ToolFormPageMode;
  initialValues?: Partial<ToolFormValues>;
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (value: ToolFormValues) => void;
};

export function ToolFormPage({
  open,
  mode,
  initialValues,
  loading = false,
  error,
  onClose,
  onSubmit,
}: ToolFormPageProps) {
  if (!open) return null;

  const title = mode === "create" ? "Criar ferramenta" : "Editar ferramenta";
  const submitLabel = mode === "create" ? "Criar" : "Editar";

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className="absolute inset-y-0 right-0 w-full max-w-md flex flex-col border-l bg-white">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-black/5 hover:text-black"
            aria-label="Fechar formulário"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {error ? (
          <div className="ml-4 mr-4 mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}
        
        <div className="flex-1 px-6 py-6">
          <ToolForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
            loading={loading}
          />
        </div>
      </aside>
    </div>
  );
}

/**
 * ! Entendendo um pouco mais sobre o tailwind
 * ----------------------------------------------------------------
 * ! 1. Div para todo o conteúdo lateral que a página form irá ocupar:
 * ! fixed: Mantemos preso na tela a nossa página lateral (ou seja, não vai se movimentar junto a página) -- ideal para modais e overlays.
 * ! inset-0: Mantém toda nossa div ocupando as partes (top = 0, right = 0, bottom = 0 e left = 0).
 * ! z-50: Mantém uma hierarquia acima de visualização (z-index: 50), como isso garantimos que fica acima de qualquer contéudo da nossa aplicação.
 *  ! É interessante deixar em 50 devido ao padrão usado de z-index em projetos (header: z-10, dropdown: z-20, tooltip: z-30, popover: z-40, modal: z-50).
 *
 * ! 2. Div para cobrir contéudo além de não somente a página lateral.
 * ! absolute: Coloca o conteúdo como fixed.
 * ! inset-0: Mantém toda nossa tela ocupando o espaço da página (top = 0, rigth = 0, bottom = 0 e left = 0).
 * ! bg-Black/60: Mantém nosso background-color com uma coloração preta de opacity = 60%.
 * ! Isso aqui dará o contraste visual para nossa página lateral estar acima do nosso conteúdo, ofuscando a listagem e dando foco para a nossa tela form.
 *
 * ! 3. Sidebar (Que representará de fato nossa tela lateral).
 * ! absolute: Coloca o conteúdo como fixed.
 * ! inset-y-0: Coloca nossa tela lateral ocupando todo o tamanho Top = 0 e Bottom = 0.
 * ! right-0: Coloca a tela lateral colada na parte direita da nossa página.
 * ! flex: Ativa o layout flexbox (assim iremos empilhar nosso conteúdo por exemplo)
 * ! flex-col: Ativamos a disposição das áreas da nossa página lateral empilhadas uma acima da outra (Ex: header => body => footer).
 * ! w-100%: Colocamos que a página tem um width de 100%.
 * ! max-w-md (Max-width): O máximo que a página lateral pode ocupar (lembrando que o md representa a escala de tamanhos no tailwind, ex: md: 448px e 2xl: 672px).
 * ! border-l (Border-left): Significa que a borda lateral da esqueda já foi definida com 1px solid, dando a entender a separação da página de listagem da nossa lateral.
 *
 * ! 4. Header (Área header da nossa página lateral).
 * ! flex: ativando flexbox.
 * ! items-center: alinhando o conteúdo verticalmente (Título e botão x).
 * ! justify-between: definindo um justify content between entre o título e o botão.
 * ! border-b: Definindo a borda de limitação do nosso header, com 1px solid, e separando visualmente o contéudo do form da página lateral do nosso header.
 * ! px-6: Padding horizontal (left e right -- eixo x) de 1.5rem. (Lembrando que o 6 é a escala de medidas do tailwind).
 * ! py-4: Padding vertical (top e bottom -- eixo y) de 1rem. (Lembrando que o 4 é a escala de medidas do tailwind).
 *
 * ! 5. Título (Titulo do nosso header -- página lateral).
 * ! text-xl: definindo o tamanho da fonte (xl = 20px).
 * ! font-semibold: peso 600 no text.
 *
 * ! 6. Botão (X) para fechar página lateral.
 * ! inline-flex: Elemento inline do flexBox (fazendo com que o flexbox dele ocupe somente a área necessária).
 *  ! É interssenta usar o inline flex para centralizar o contéudo do button no meio por exemplo, como o ícone x.
 * ! h-9: Altura de 2.25rem.
 * ! w-9: Largura de 2.25rem.
 * ! items-center & justify-center: Centralizando o ícone dentro do inline flex do button.
 * ! rounder-full: Fazendo o botão x ser totalmente redondo.
 * ! text-zinc-400: (Zinc é uma cor definida na paleta de cores do tailwind = Cinza).
 * ! transition: Ativando animação suave para quando mouse passar encima.
 * ! hover:bg-white/5: Quando o mouse passar encima do botão o background é preto e com opacity de 5%.
 * ! hover:text-white: Quando o mouse passar encima do botão o ícone ao invés de ser cinza fica preto.
 *
 * ! 7. Conteúdo da nossa página lateral.
 * ! flex-1: O conteúdo da nossa página lateral deve ocupar todo o espaço restante da nossa tela lateral (flex-grow: 1).
 * ! overflow-y-auto: Isso serve para proteger nossa página lateral, garantindo que se o conteúdo crescer demais será colocado um scroll para navegar por ele.
 * ! px-6 e py-6: Padding horizontal e vertical de 1.5rem.
 *
 * ! 8. Modal de erro:
 * ! mb-4: margin-bottom = 1rem.
 * ! rounded-xl: Bordas arrendondadas.
 * ! border: Definindo bordas top, right, bottom e left.
 * ! border-red-500/30: definindo cor das bordas avermelhadas com opacity de 30%.
 * ! bg-red-500/10: Background vermelho com opacity de 10%.
 * ! text-sm: Fonte pequena para letras.
 * ! text-red-200: Texto vermelho claro.
 */

import ESLintIcon from './assets/eslint.svg';
import ReactRouterIcon from './assets/reactrouter.svg';
import TailwindCssIcon from './assets/tailwindcss.svg';
import TypescriptIcon from './assets/typescript.svg';
import VitestIcon from './assets/vitest.svg';

export const toolIcons: Record<string, string> = {
    "react-router-dom": ReactRouterIcon,
    tailwind: TailwindCssIcon,
    typescript: TypescriptIcon,
    eslint: ESLintIcon,
    vitest: VitestIcon
}

export function getToolIcon(toolId: string) {
    return toolIcons[toolId] ?? 'Icon not found';
}

// O Record para o TS é o mesmo que o dictionary
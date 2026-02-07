// Com isso aqui dizemos ao TS que quando importarmos um svg ele vira uma string URL
declare module "*.svg" {
  const src: string;
  export default src;
}
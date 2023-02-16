export interface Cliente{
  nome: string;
  cognome: string;
  antifurti: Antifurto[];
}

export interface Antifurto{
  nome: string;
  numCentralina: number;
  codiceCliente: number;
}

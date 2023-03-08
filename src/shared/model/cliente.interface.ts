export interface Cliente{
  nome: string;
  cognome: string;
  antifurti: Antifurto[];
}

export interface Antifurto{
  nome: string;
  numCentralina: number;
  codiceCliente: number;
  ingressi: Ingresso[];
}

export interface Ingresso{
  numero: number;
  nome: string;
  descrizione: string;
}

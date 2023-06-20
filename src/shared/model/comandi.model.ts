export class ComandiModel{
  comandi = [
    ['R.C','Rapporto centrale'],
    ['R.I', 'Rapporto ingressi'],
    ['R.M', 'Rapporto memorie'],
    ['R.A', 'Rapporto anomalie'],
    ['R.U', 'Rapporto uscite'],
    ['R.E', 'Rapporto ing. esclusi'],
    ['R.S', 'Rapporto settori'],
    ['R.T', 'Rapporto termostato'],
    ['R.P', 'Rapporto posizione GPS'],
    ['R.B', 'Rapporto tensione batt. ext'],
    ['I.ON', 'Inserimento aree'],
    ['I.P1', 'Inserimento settori preposti'],
    ['I.P2', 'Inserimento settori permessi meno preposti'],
    ['I.OFF', 'Disinserimento area'],
    ['G.ON', 'Accensione GSM'],
    ['G.OFF', 'Spegnimento GSM'],
    ['M.ON', 'Richiesta di ascolto ambientale'],
    ['T.ON', 'Accensione cronotermotato automatico'],
    ['T.OFF', 'Spegnimento cronotermostato'],
    ['T.FRZ', 'Cronotermostato mod. antigelo'],
    ['T.#', 'Conotermostato manuale'],
    ['A.#', 'Attivazione uscita'],
    ['D.#', 'Disattivazione uscita'],
    ['E.#', 'Esclusione ingresso'],
    ['N.#', 'Inclusione ingresso'],
    ['S.#', 'Manovra l\'uscita'],
    ['P.#', 'Ripetizione invio coordinate GPS'],
    ['P.ON', 'Rip. coordinate GPS valore software'],
    ['P.OFF', 'Disattiva rip. invio coordinate GPS'],
    ['C.ON', 'Attiva lettura credito residuo'],
    ['C.OFF', 'Disattiva lettura credito residuo'],
  ];

  getComandi(){
    return this.comandi.slice();
  }

  getComando(i: number){
    const value = this.comandi[i][0];
    return value;
  }

  getComandoDesc(i: number){
    return this.comandi[i][1];
  }
}

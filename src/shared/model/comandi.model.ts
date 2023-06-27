export class ComandiModel{
  comandi = [
    ['G.ON', 'Accensione GSM'],
    ['T.ON', 'Accensione cronotermotato automatico'],
    ['C.ON', 'Attiva lettura credito residuo'],
    ['A.#', 'Attivazione uscita'],
    ['T.#', 'Conotermostato manuale'],
    ['T.FRZ', 'Cronotermostato mod. antigelo'],
    ['C.OFF', 'Disattiva lettura credito residuo'],
    ['P.OFF', 'Disattiva rip. invio coordinate GPS'],
    ['D.#', 'Disattivazione uscita'],
    ['I.OFF', 'Disinserimento area'],
    ['E.#', 'Esclusione ingresso'],
    ['N.#', 'Inclusione ingresso'],
    ['I.ON', 'Inserimento aree'],
    ['I.P2', 'Inserimento settori permessi meno preposti'],
    ['I.P1', 'Inserimento settori preposti'],
    ['S.#', 'Manovra l\'uscita'],
    ['R.A', 'Rapporto anomalie'],
    ['R.C','Rapporto centrale'],
    ['R.E', 'Rapporto ing. esclusi'],
    ['R.I', 'Rapporto ingressi'],
    ['R.M', 'Rapporto memorie'],
    ['R.P', 'Rapporto posizione GPS'],
    ['R.S', 'Rapporto settori'],
    ['R.B', 'Rapporto tensione batt. ext'],
    ['R.T', 'Rapporto termostato'],
    ['R.U', 'Rapporto uscite'],
    ['M.ON', 'Richiesta di ascolto ambientale'],
    ['P.ON', 'Rip. coordinate GPS valore software'],
    ['P.#', 'Ripetizione invio coordinate GPS'],
    ['G.OFF', 'Spegnimento GSM'],
    ['T.OFF', 'Spegnimento cronotermostato'],
  ];

  simpleComandi = [
    ['I.OFF', 'Disinserimento area'],
    ['E.#', 'Esclusione ingresso'],
    ['N.#', 'Inclusione ingresso'],
    ['I.ON', 'Inserimento aree'],
    ['R.S', 'Rapporto settori'],
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

  getComandiSimpleUser(){
    return this.simpleComandi.slice();
  }
}

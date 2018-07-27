class Marcador {
  constructor() {
    this._sprite = new Sprite('.sprite');
    this._limpaMarcador();
  }

  _limpaMarcador() {
    this._palpitesErrados = [];
    this._sprite.reset();
  }

  perdeVida(palpite) {
    this._sprite.nextFrame();

    if (this._sprite.hasNext()) {
      this._palpitesErrados.push(palpite);
    } else {
      alert('game over!');
      this._limpaMarcador();
    }
  }
}



class Jogo {
  constructor() {
    this._lacunas = [];
    this._palpites = [];

    this._marcador = new Marcador();
    this.setPalavraSecreta();
  }

  setPalavraSecreta(palavra) {
    this._palavra = new Palavra(palavra);
    this._lacunas = this._palavra.getCharsPalavraSecreta();
    this.getLacunas();
  }

  getLacunas() {
    console.log(this._palavra.getPalavraSecreta());
    console.log(this._lacunas);
    return [].concat(this._lacunas);
  }

  /**
   *
   * @param {char} char
   * @param {array} posicoes
   */
  _preencheLacunas(char, posicoes) {
    posicoes.forEach(index => this._lacunas[index] = char);
  }

  chute(palpite) {
    const posicoes = this._palavra.getIndexChar(palpite);

    if (posicoes.length) {
      this._preencheLacunas(palpite, posicoes);
    } else {
      this._marcador.perdeVida(palpite);
    }
  }



}

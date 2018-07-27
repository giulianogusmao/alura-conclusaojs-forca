class Jogo {
  constructor() {
    this._lacunas = [];
    this._palpites = [];

    this._sprite = new Sprite('.sprite');
    this._palavra = new Palavra();
    // this._marcador = new Marcador();
    this.setPalavraSecreta();
  }

  /**
   *
   * @param {string=} palavra
   */
  setPalavraSecreta(palavra) {
    this._palavra.setPalavraSecreta(palavra);
    this._lacunas = this._palavra.getCharsPalavraSecreta();
    this._palpites = [];
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
    }
    else {
      this._sprite.nextFrame();
    }
  }

  ganhou() {
    return this._lacunas.length
      ? !this._lacunas.some(lacuna => lacuna == '')
      : false;
  };

  perdeu() {
    return this._sprite.isFinish();
  };

  ganhouOuPerdeu() {
    return this.ganhou() || this.perdeu();
  };

  reinicia() {
    this._sprite.reset();
    this.setPalavraSecreta();
  };
}

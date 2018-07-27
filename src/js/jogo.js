class Palpite {
  constructor(char, sucesso) {
    this.value = char;
    this.type = sucesso ? 'success' : 'danger';
  }
}


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
   * Atualiza valor da palavra secreta
   * @param {string=} palavra - opcional passar uma palavra
   */
  setPalavraSecreta(palavra) {
    this._palavra.setPalavraSecreta(palavra);
    this._lacunas = this._palavra.getCharsPalavraSecreta();
    this._palpites = [];

    console.log(`jogo iniciado - ${this._palavra.getPalavraSecreta()} - ${JSON.stringify(this.getLacunas())}`)
  }

  /**
   * @return {strimg} - palavra secreta
   */
  getPalavraSecreta() {
    return this._palavra.getPalavraSecreta();
  }

  /**
   * @return {array} - retorna um array com as lacunas
   */
  getLacunas() {
    return [].concat(this._lacunas);
  }

  /**
   * @return {array} - array com os caracteres que foram informados
   */
  getPalpites() {
    return [].concat(this._palpites);
  }

  /**
   * verifica se o caracter existe na palavra secreta
   * @param {char} char - caracter
   * @return {boolean}
   */
  processaChute(char) {
    const posicoes = this._palavra.getIndexChar(char);

    if (posicoes.length) {
      this._preencheLacunas(char, posicoes);
      this._palpites.push(new Palpite(char, true));
      return true;
    }
    else {
      this._sprite.nextFrame();
      this._palpites.push(new Palpite(char, false));
      return false;
    }
  }

  /**
   * verifica se o todas as lacunas foram preenchidas corretamente
   * @return {boolean}
   */
  ganhou() {
    return this._lacunas.length
      ? !this._lacunas.some(lacuna => lacuna == '')
      : false;
  };

  /**
   * verifica se os frames acabaram
   * @return {boolean}
   */
  perdeu() {
    return this._sprite.isFinish();
  };

  /**
   * verifica se o jogo acabou
   * @return {boolean}
   */
  ganhouOuPerdeu() {
    return this.ganhou() || this.perdeu();
  };

  /**
   * zera configurações do jogo
   */
  reinicia() {
    this._sprite.reset();
    this.setPalavraSecreta();
  };

  /**
   *
   * @param {char} char
   * @param {array} posicoes
   */
  _preencheLacunas(char, posicoes) {
    posicoes.forEach(index => this._lacunas[index] = char);
  }
}

class Palavra {
  constructor(palavra) {
    this._palavras = [
      'Lavatório',
      'Pescoço',
      'Camisa',
      'Trem',
      'Galinha',
      'Faca',
      'Gelo',
      'Parede',
      'Livro',
      'Casa'
    ];

    this._lastRandom;
    palavra && this.setPalavraSecreta(palavra);
  }

  /**
   * Altera palavra secreta
   * @param {string=} palavra - caso não seja passado nenhuma palavra secreta, será gerada uma alatória
   */
  setPalavraSecreta(palavra) {
    this._palavraSecreta = palavra || this._getNovaPalavra();
  }

  /**
   * Get Palavra secreta
   * @return {string} - palavra secreta
   */
  getPalavraSecreta() {
    return this._palavraSecreta + '';
  }

  /**
   * @return {array} lista de caracteres da palavra secreteta
   */
  getCharsPalavraSecreta() {
    return Array((this._palavraSecreta || '').length).fill('')
  }

  /**
   * @returns {string} - retorna uma palavra aleatória da lista de palavras
   */
  _getNovaPalavra() {
    let random;
    let i = 0;
    do {
      random = Math.floor(Math.random() * (this._palavras.length - 1));
    } while (random == this._lastRandom);
    this._lastRandom = random;
    return this._palavras[random];
  }

  /**
   * Pega as posicoes de um determinado caracter da palavra secreta
   * @param {char} char - caracter que será pesquisado
   * @return {array} - array com as posições dos caracteres encontrados
   */
  getIndexChar(char) {
    return this._getAllIndexes((this._palavraSecreta || '').toLowerCase().split(''), (char || '').toLowerCase());
  }

  _getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
      indexes.push(i);
    }
    return indexes;
  }
}

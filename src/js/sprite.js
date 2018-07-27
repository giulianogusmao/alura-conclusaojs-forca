class Sprite {
    constructor(selector) {
        this._$selector = $(selector);
        this._frameName = 'frame';
        this._framesLength = 9;
        this._currentFrame = 1;
    }

    /**
     * Incrementa os frames da forca
     */
    nextFrame() {
        if (this.isFinish()) {
            throw Error('Limite de frames excedido! chame o reset para reiniciar a contagem');
        }
        this._moveFrame(this._currentFrame, ++this._currentFrame);
    }
    
    /**
     * Verifica se existem frames para avançar
     */
    hasNext() {
        return this._currentFrame < this._framesLength;
    }

    /**
     * Verifica se acabaram os frames
     */
    isFinish() {
        return !this.hasNext();
    }

    /**
     * Reinicia contagem dos frames
     */
    reset() {
        this._moveFrame(this._currentFrame, 1);
        this._currentFrame = 1;
    }

    /**
     * Move o frame removendo a classe FROM e adicionando uma nova classe
     * para o ponto TO onde será movido.
     * 
     * @param {number} from - Ponto inial que o frame será movido
     * @param {number} to - ponto final para onde o frame será movido
     */
    _moveFrame(from, to) {
        this._$selector
            .removeClass(`${this._frameName}${from}`)
            .addClass(`${this._frameName}${to}`);
    }
}
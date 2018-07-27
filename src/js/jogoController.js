class JogoController {
  constructor() {
    this.started = false;

    this._$lacunas = $('.lacunas');
    this._$chutes = $('.chutes');
    this._$divInput = $('.group-input');
    this._$inputChute = $('.chute');
    this._$divReiniciar = $('.reiniciar');
    this._$btnReiniciar = $('.reiniciar .btn');
    this._$mensagem = $('.mensagem');

    this._$btnReiniciar.on('click', () => this.reinicia());
  }

  _validafimDeJogo() {
    if (this._jogo.ganhouOuPerdeu()) {

      this._$divInput.fadeOut();
      this._$divReiniciar.fadeIn();
      this._$mensagem.fadeIn();

      if (this._jogo.ganhou()) {
        this._$mensagem
          .text('Parabéns! você é zica!')
          .removeClass('alert-danger')
          .addClass('alert-success');
      } else {
        this._$mensagem
          .html(`Não foi dessa vez, a plavra secreta era <strong>${this._jogo.getPalavraSecreta()}</strong>`)
          .removeClass('alert-success')
          .addClass('alert-danger');
      }
    }
  }

  _leChute(valor) {
    try {
      this._jogo.processaChute(valor)
        && this._updateLacunas();
    } catch (err) { }

    this._updateChutes();
    this._validafimDeJogo();
  }

  _updateLacunas() {
    let lacunas = this._jogo
      .getLacunas()
      .map(lacuna => {
        return `
          <li class="lacuna">
              ${lacuna ? lacuna : '&nbsp;'}
          </li>`;
      });

    this._$lacunas.html(lacunas);
    return this;
  }

  _updateChutes() {
    let chutes = this._jogo
      .getPalpites()
      .map(chute => {
        return `
          <li class="chute alert-${chute.type}">
              ${chute.value}
          </li>`;
      });

    this._$chutes.html(chutes);
    return this;
  }

  inicia() {
    if (this.started)
      throw Error('O jogo já foi iniciado e só pode ser reiniciado.');

    const self = this;
    this._jogo = new Jogo();
    this._updateLacunas();
    this.started = true;

    this._$inputChute.keypress(function (event) {
      if (event.which == 13 && this.value) {
        let char = this.value.trim().substr(0, 1);
        let existe = self._jogo.getPalpites().some(palpite => palpite.value == char);

        if (existe) {
          alert(`Ta panguando jão? Já chutou a letra "${char.toUpperCase()}", tente outra!`);
        } else {
          self._leChute(char);
        }
        this.value = '';
      }
    });

    return this;
  }

  reinicia() {
    this._jogo.reinicia();
    this._updateChutes();
    this._updateLacunas();

    this._$divInput.show();
    this._$divReiniciar.hide();

    this._$mensagem.text('')
      .removeClass('alert-success')
      .removeClass('alert-danger')
      .hide();

    return this;
  }
}

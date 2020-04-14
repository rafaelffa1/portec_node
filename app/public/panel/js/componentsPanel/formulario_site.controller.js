'use strict';

const e = React.createElement;

class FormularioSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      text: '',
      mensagemSucesso: false
    }
  }

  onChangeName = (name) => {
    this.setState({ name: name.target.value })
  }

  onChangeEmail = (email) => {
    this.setState({ email: email.target.value })
  }

  onChangeSubject = (subject) => {
    this.setState({ subject: subject.target.value })
  }

  onChangeText = (text) => {
    this.setState({ text: text.target.value })
  }

  enviarFormulario = (e) => {
    e.preventDefault();
    const { name, email, subject, text } = this.state;

    $.ajax({
      type: "POST",
      url: `http://${window.location.host}/envio_email`,
      data: { name, email, subject, text },
      success: (resp) => {
        if (resp.result === true) {
          this.setState({
            mensagemSucesso: true
          })
          setTimeout(function () {
            this.setState({
              mensagemSucesso: false
            })
          }, 3000);
        } else {
          console.log(resp.result);
        }
      }
    })
  }

  render() {
    const { name, email, subject, text, mensagemSucesso } = this.state;
    return (
      <form id="contactForm" className="contact-form">

        {
          mensagemSucesso === true &&
          <div className="contact-form-success alert alert-success">
            <strong>Enviado com Sucesso!</strong> Em breve iremos responder sua mensagem.
				  </div>
        }

        <div className="form-row">
          <div className="form-group col-lg-6">
            <label className="required font-weight-bold text-dark text-2">Nome Completo</label>
            <input onChange={(e) => this.onChangeName(e)} type="text" value={name} maxlength="100" className="form-control" />
          </div>

          <div className="form-group col-lg-6">
            <label className="required font-weight-bold text-dark text-2">Email</label>
            <input type="email" onChange={(e) => this.onChangeEmail(e)} value={email} className="form-control" name="email" />
          </div>

        </div>
        <div className="form-row">
          <div className="form-group col">
            <label className="font-weight-bold text-dark text-2">Assunto</label>
            <input type="text" onChange={(e) => this.onChangeSubject(e)} value={subject} className="form-control" name="subject" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label className="required font-weight-bold text-dark text-2">Mensagem</label>
            <textarea maxlength="5000" onChange={(e) => this.onChangeText(e)} value={text} rows="8" className="form-control" name="message">
            </textarea>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <input type="submit" value="Enviar" disabled={mensagemSucesso} onClick={(e) => this.enviarFormulario(e)} className="btn btn-primary btn-modern" />
          </div>
        </div>
      </form>
    );
  }
}

const domContainer = document.querySelector('#formulariosite');
ReactDOM.render(e(FormularioSite), domContainer);
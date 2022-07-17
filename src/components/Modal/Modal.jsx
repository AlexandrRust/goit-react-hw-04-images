import { Component } from 'react';
import { Overlay, ModalForImg } from './Modal.styled';
import { createPortal } from 'react-dom';

const ModalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  state = {
    modalOverlay: '',
  };
  componentDidMount = () => {
    window.addEventListener('keydown', this.hendleKeydouwn);
    this.setState({ modalOverlay: document.querySelector('.overlay') });
    window.addEventListener('click', this.hendleClick);
  };
  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.hendleKeydouwn);
    window.addEventListener('click', this.hendleClick);
  };

  hendleKeydouwn = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  hendleClick = e => {
    if (e.target === this.state.modalOverlay) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay className="overlay">
        <ModalForImg className="modal">{this.props.children}</ModalForImg>
      </Overlay>,
      ModalRoot
    );
  }
}

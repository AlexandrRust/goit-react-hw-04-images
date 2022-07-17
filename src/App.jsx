import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from 'components/Container/Container.styled';
import { Gallery } from 'components/Gallery/Gallery';
import { Modal } from 'components/Modal/Modal';
import { BtnLoadMore } from 'components/BtnLoadMore/BtnLoadMore.styled';
import { getImages } from 'components/services/img-api';
import { BoxStatus } from 'components/BoxStatus/BoxStatus.syled';

export class App extends Component {
  state = {
    query: '',
    page: null,
    total: null,
    images: [],
    image: {},
    showModal: false,
    status: 'idle',
    error: '',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  hendleSubmit = ({ query, page }) => {
    this.setState({ query, page });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'pending' });
      getImages(
        this.state.query,
        this.state.page,
        this.setImages,
        this.hendleError
      );
    }
  }

  setImages = ({ total, hits }) => {
    if (total === 0) {
      this.setState({
        status: 'rejected',
      });
    } else {
      this.setState({
        total,
        images:
          this.state.page === 1 ? [...hits] : [...this.state.images, ...hits],
        status: 'resolved',
      });
    }
  };

  getImg = id => {
    this.state.images.find(
      element => element.id === id && this.setState({ image: element })
    );
    this.toggleModal();
  };
  hendlePage = () => {
    this.setState(({ page }) => ({
      page: (page += 1),
    }));
  };
  hendleError = ({ message }) => {
    this.setState({ error: message, status: 'rejected' });
    console.log(message);
  };

  render() {
    const { showModal, image, images, status, total, page, error } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.hendleSubmit} />
        {error !== '' ? (
          <BoxStatus>{error}</BoxStatus>
        ) : (
          <Gallery
            images={images}
            getItem={this.getImg}
            status={status}
            total={total}
          />
        )}

        {status === 'resolved' &&
          total / 20 > 1 &&
          Math.ceil(total / 20) > page && (
            <BtnLoadMore type="button" onClick={this.hendlePage}>
              Load More
            </BtnLoadMore>
          )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={image.largeImageURL} alt={image.tags} />
          </Modal>
        )}
      </Container>
    );
  }
}

import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from 'components/Container/Container.styled';
import { Gallery } from 'components/Gallery/Gallery';
import { Modal } from 'components/Modal/Modal';
import { BtnLoadMore } from 'components/BtnLoadMore/BtnLoadMore.styled';
import { getImages } from 'components/services/img-api';
import { BoxStatus } from 'components/BoxStatus/BoxStatus.syled';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(null);
  const [total, setTotal] = useState(null);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const hendleSubmit = ({ query, page }) => {
    setQuery(query);
    setPage(page);
  };

  const getImagesHits = ({ total, hits }) => {
    if (total === 0) {
      setStatus('rejected');
    } else {
      setTotal(total);
      setImages(page === 1 ? [...hits] : [...images, ...hits]);
      setStatus('resolved');
    }
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    setStatus('rejected');
    getImages(query, page, getImagesHits, hendleError);
  }, [query, page]);

  const getImg = id => {
    images.find(element => element.id === id && setImage(element));
    toggleModal();
  };

  const hendlePage = () => {
    setPage(page => page + 1);
  };
  const hendleError = ({ message }) => {
    setError(message);
    setStatus('rejected');
  };

  return (
    <Container>
      <Searchbar onSubmit={hendleSubmit} />
      {error !== '' ? (
        <BoxStatus>{error}</BoxStatus>
      ) : (
        <Gallery
          images={images}
          getItem={getImg}
          status={status}
          total={total}
        />
      )}

      {status === 'resolved' && total / 20 > 1 && Math.ceil(total / 20) > page && (
        <BtnLoadMore type="button" onClick={hendlePage}>
          Load More
        </BtnLoadMore>
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={image.largeImageURL} alt={image.tags} />
        </Modal>
      )}
    </Container>
  );
}

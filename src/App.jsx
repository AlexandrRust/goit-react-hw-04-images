import { statusData } from 'const/statusData';
import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from 'components/Container/Container.styled';
import { Gallery } from 'components/Gallery/Gallery';
import { Modal } from 'components/Modal/Modal';
import { BtnLoadMore } from 'components/BtnLoadMore/BtnLoadMore.styled';
import { getImages } from 'services/img-api';
import { BoxStatus } from 'components/BoxStatus/BoxStatus.syled';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(null);
  const [total, setTotal] = useState(null);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(statusData.idle);
  const [error, setError] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const hendleSubmit = ({ query, page }) => {
    setQuery(query);
    setPage(page);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus(statusData.pending);
    const getImagesHits = ({ total, hits }) => {
      if (total === 0) {
        setStatus(statusData.rejected);
      } else {
        setError('');
        setTotal(total);
        setImages(prevImages =>
          page === 1 ? [...hits] : [...prevImages, ...hits]
        );
        setStatus(statusData.resolved);
      }
    };

    getImages(query, page, getImagesHits, hendleError);
  }, [query, page]);

  const getImg = id => {
    images.find(element => element.id === id && setImage(element));
    toggleModal();
  };

  const hendleError = ({ message }) => {
    setError(message);
    setStatus(statusData.rejected);
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
          page={page}
          total={total}
        />
      )}

      {status === statusData.resolved && Math.ceil(total / 20) > page && (
        <BtnLoadMore type="button" onClick={() => setPage(page => page + 1)}>
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

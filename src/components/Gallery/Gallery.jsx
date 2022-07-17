import { GalleryList, GalleryItem, GalleryImg } from './Gallery.styled';
import { BoxStatus } from 'components/BoxStatus/BoxStatus.syled';
import { BallTriangle } from 'react-loader-spinner';
import Notiflix from 'notiflix';
import image from '../../images/no-image.jpg';

export const Gallery = ({ images, getItem, status, page, total }) => {
  switch (status) {
    case 'idle':
      return <BoxStatus>Введите Имя картинки!!</BoxStatus>;
    case 'pending':
      return (
        <BoxStatus>
          <BallTriangle color="#00BFFF" height={80} width={80} />
        </BoxStatus>
      );
    case 'rejected':
      return (
        <>
          {Notiflix.Notify.failure('Картинок с таким именем нет!!!')}
          <img src={image} alt="" />
        </>
      );
    case 'resolved':
      return (
        <>
          {page === 1 && Notiflix.Notify.info(`Найдено ${total} картинок!!!`)}
          <GalleryList className="gallery">
            {images.map(element => (
              <GalleryItem className="gallery-item" key={element.id}>
                <GalleryImg
                  id={element.id}
                  src={element.previewURL}
                  alt={element.tags}
                  data-source={element.largeImageURL}
                  onClick={() => getItem(element.id)}
                />
              </GalleryItem>
            ))}
          </GalleryList>
        </>
      );
    default:
      return;
  }
};

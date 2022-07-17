import { GalleryList, GalleryItem, GalleryImg } from './Gallery.styled';
import { BoxStatus } from 'components/BoxStatus/BoxStatus.syled';
import { BallTriangle } from 'react-loader-spinner';

export const Gallery = ({ images, getItem, status, total }) => {
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
      return <BoxStatus>Картинок с таким именем нет!!!</BoxStatus>;
    case 'resolved':
      return (
        <>
          <BoxStatus>Найдено {total} картинок!!!</BoxStatus>;
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
// if (status === 'idle') {
//   return <BoxStatus>Введите Имя картинки!!</BoxStatus>;
// } else if (status === 'rejected') {
//   return <BoxStatus>Картинок с таким именем нет!!!</BoxStatus>;
// } else if (status === 'resolved') {
//   return (
//     <>
//       <GalleryList className="gallery">
//         {images.map(element => (
//           <GalleryItem className="gallery-item" key={element.id}>
//             <GalleryImg
//               id={element.id}
//               src={element.previewURL}
//               alt={element.tags}
//               data-source={element.largeImageURL}
//               onClick={() => getItem(element.id)}
//             />
//           </GalleryItem>
//         ))}
//       </GalleryList>
//     </>
//   );

import { IonImg, IonSlide, IonSlides } from '@ionic/react';
import { useRef, useEffect, useState } from 'react';
import { snaps } from '../../utils/cropperData';

import './style.css';

const Rotate = ({ cropper }: { cropper: any }) => {
  const range = useRef<any>(null);
  const [deg, setDeg] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(0);

  const slideOptions = {
    initialSlide: 64,
    speed: 400,
    slidesPerView: 51,
    centeredSlides: true,
    centeredSlidesBounds: true,
  };

  useEffect(() => {
    cropper.rotateTo(deg);
    cropper.move(1, -1);
    // console.log(`1....zoom______${zoom}`, `deg-- ${deg}`);
    const imageData = cropper.getImageData();
    if (imageData.width > imageData.height) {
      cropper.zoomTo(1.5 * zoom);
    } else {
      cropper.zoomTo(zoom);
    }
  }, [deg, zoom]);

  const handleSlideChange = async () => {
    const swiper = await range.current.getActiveIndex();
    setDeg(snaps[swiper].range);
    setZoom(snaps[swiper].coefficient);
  };

  return (
    <div className='rotate'>
      <IonSlides ref={range} options={slideOptions} className='rangeSlider' onIonSlideWillChange={handleSlideChange}>
        {
          snaps.map((item, index) => {
            return (
              <IonSlide key={item.pic + index} className='setRange'>
                <IonImg
                  className={item.height === 'short' ? 'shortLine' : 'longLine'}
                  src={item.pic}
                />
              </IonSlide>
            )
          })
        }
      </IonSlides>
      <div className='activeLine'>
        <IonImg
          className='activeIcon'
          src={require('../../assets/icons/rotate/activeLine.png')}
        />
      </div>
      <div className='rangeButtons'>
        <IonImg
          onClick={() => { cropper.rotate(90) }}
          className='icon'
          src={require('../../assets/icons/left.png')}
        />
        <IonImg
          onClick={() => { cropper.rotate(-90) }}
          className='icon'
          src={require('../../assets/icons/right.png')}
        />
      </div>
    </div>
  )
};

export default Rotate;
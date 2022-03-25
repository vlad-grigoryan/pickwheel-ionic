import { useState } from 'react';
import { IonSlide, IonSlides, IonLabel, IonImg } from '@ionic/react';
import { aspectRatio } from '../../utils/cropperData';

import './style.css';

const AspectRatioSlider = ({ cropper }: { cropper: any }) => {
  const [activeRatio, setActiveRatio] = useState<number>(0)

  const slideOptions = {
    initialSlide: activeRatio,
    speed: 400,
    slidesPerView: 5,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };

  return (
    <IonSlides options={slideOptions} className='slider'>
      {
        aspectRatio.map(item => {
          return (
            <IonSlide key={item.pic} className='setAspectRatio' onClick={() => { setActiveRatio(item.id); cropper.setAspectRatio(item.ratio) }}>
              <IonImg
                className='icon'
                src={activeRatio === item.id ? item.picActive : item.pic}
              />
              <IonLabel className='buttonTitle' style={{ color: activeRatio === item.id ? '#7001B4' : 'white' }}>{item.label}</IonLabel>
            </IonSlide>
          )
        })
      }
    </IonSlides>
  )
};

export default AspectRatioSlider;
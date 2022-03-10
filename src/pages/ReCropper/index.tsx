import Cropper from 'cropperjs';
import { IonContent, IonPage, IonLabel, IonImg, IonSlides, IonSlide } from '@ionic/react';
import { useState, useRef, useEffect } from 'react';
import Home from '../Home/index';
import { savePicture, shareing } from '../../utils/usePhotoGallery';
import { aspectRatio } from '../../utils/cropperData';
import 'cropperjs/dist/cropper.css';
import './style.css';

const ReCropper = ({ imgUrl, imgFormat }: { imgUrl: string; imgFormat: string }) => {
  const [homePage, setHomePage] = useState<boolean>(false);
  const [cropper, setCropper] = useState<any>(null);
  const imageRef = useRef<any>(null);
  const [imageSRC, setImageSRC] = useState<string>('');

  useEffect(() => {
    imageRef.current.src = imgUrl;

    const cropperjs = imageRef.current && new Cropper(imageRef.current, {
      viewMode: 1,
      modal: true,
      guides: true,
      highlight: true,
      center: true,
      background: false,
      autoCrop: true,
      movable: false,
      zoomable: false,
      autoCropArea: 1,
      responsive: true,
      cropBoxMovable: true,
      cropBoxResizable: true,
      scalable: false,
      ready: () => {
        console.log('cropper ready');
      },
      crop: e => {
        console.log(e.detail);
      },
    });
    setCropper(cropperjs);

    return () => {
      window.URL.revokeObjectURL(imgUrl);
    };
  }, [imgUrl, imageRef]);

  const getCroppedImage = () => {
    const cropped = cropper.getCroppedCanvas({
      minWidth: 256,
      minHeight: 256,
      maxWidth: 4096,
      maxHeight: 4096,
      fillColor: '#fff',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high',
    }).toDataURL({
      format: `image/${imgFormat}`,
      quality: 1.0,
    });

    setImageSRC(cropped);
    let name = new Date().getTime() + `.${imgFormat}`;
    return { cropped, name }
  };

  const saveImageToGallery = () => {
    const data = getCroppedImage();
    savePicture({
      path: data.cropped,
      format: imgFormat,
      saved: false,
    }, data.name);
  };

  const shareImage = () => {
    const data = getCroppedImage();
    shareing(data.cropped, data.name);
  };

  const slideOptions = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 5,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  }

  if (homePage) {
    return <Home />
  }

  return (
    <IonPage>
      <IonContent>
        <div className='cropperContainer'>
          <div className='top'>
            <div className='ionHeaderNavigation'>
              <div className='ionBack' onClick={() => setHomePage(true)}>
                <IonImg
                  className='icon'
                  src={require('../../assets/icons/backArrow.png')}
                />
              </div>
              <div className='saveAndShareContainer'>
                <div className='saveAndShare' onClick={saveImageToGallery}>
                  <IonImg
                    className='icon'
                    src={require('../../assets/icons/download.png')}
                  />
                </div>
                <div className='saveAndShare' onClick={shareImage}>
                  <IonImg
                    className='icon'
                    src={require('../../assets/icons/share.png')}
                  />
                </div>
              </div>
            </div>
            <div className='undoRedoNavigation'>
              <div className='undoRedo' onClick={() => { }}>
                <IonImg
                  className='undoRedoicon'
                  src={require('../../assets/icons/undoActive.png')}
                />
              </div>
              <div className='undoRedo' onClick={() => { }}>
                <IonImg
                  className='icon'
                  src={require('../../assets/icons/redoActive.png')}
                />
              </div>
            </div>
          </div>

          <div className='reCropperParent'>
            <div className='reCropper' >
              {
                (!imageSRC) ? <img ref={imageRef} alt='Cropping' /> : <img src={imageSRC} alt='Cropped' />
              }
            </div>
          </div>

          <div className='bottom'>
            <div className='doneButton' onClick={() => console.log('done')}>
              <IonLabel className='buttonTitle'>Done</IonLabel>
            </div>
            <div className='aspectRatioContainer'>
              <IonSlides options={slideOptions}>
                {
                  aspectRatio.map(item => {
                    return (
                      <IonSlide key={item.pic} className='setAspectRation' onClick={() => cropper.setAspectRatio(item.ration)}>
                        <IonImg
                          className='icon'
                          src={item.pic}
                        />
                        <IonLabel className='buttonTitle'>{item.label}</IonLabel>
                      </IonSlide>
                    )
                  })
                }
              </IonSlides>
            </div>
            <div className='instrumentsSection'>
              <div className='instrument'>Crop</div>
              <div className='instrument'>Rotate</div>
              <div className='instrument'>Mirror</div>
            </div>
          </div>

        </div>
        <div className='contentOpacity' />
      </IonContent>
    </IonPage>
  );
};

export default ReCropper;

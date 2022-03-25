import Cropper from 'cropperjs';
import { IonContent, IonPage, IonImg } from '@ionic/react';
import { useState, useRef, useEffect } from 'react';
import Home from '../Home/index';
import { SpinnedPopoverLoading, AspectRatioSlider, Rotate, Mirror} from '../../components';
import { savePicture, shareing } from '../../utils/usePhotoGallery';
import 'cropperjs/dist/cropper.css';
import './style.css';

const ReCropper = ({ imgUrl, imgFormat }: { imgUrl: string; imgFormat: string }) => {
  const [homePage, setHomePage] = useState<boolean>(false);
  const [cropper, setCropper] = useState<any>(null);
  const [imageSRC, setImageSRC] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [instrument, setInstrument] = useState<string>('Scissors');
  const imageRef = useRef<any>(null);

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
      movable: true,
      zoomable: true,
      autoCropArea: 1,
      responsive: true,
      cropBoxMovable: true,
      cropBoxResizable: true,
      scalable: true,
      ready: () => {
        setLoading(false);
        console.log('cropper ready');
      },
      crop: e => {
        console.log(e.detail.rotate, 'rotate');
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
    setLoading(true);

    const data = getCroppedImage();
    savePicture({
      path: data.cropped,
      format: imgFormat,
      saved: false,
    }, data.name);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const shareImage = () => {
    const data = getCroppedImage();
    shareing(data.cropped, data.name);
  };

  if (homePage) {
    return <Home />
  }

  return (
    <IonPage>
      <IonContent>
        <div className='cropperContainer'>
          <SpinnedPopoverLoading loading={loading} />
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
            {/* <div className='undoRedoNavigation'>
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
            </div> */}
          </div>

          <div className='reCropperParent'>
            <div className='reCropper' >
              {
                (!imageSRC) ? <img ref={imageRef} alt='Cropping' /> : <img src={imageSRC} alt='Cropped' />
              }
            </div>
          </div>

          <div className='bottom'>
            {/* <div className='doneButton' onClick={() => console.log('done')}>
              <IonLabel className='buttonTitle'>Done</IonLabel>
            </div> */}
            {instrument === 'Scissors' && <AspectRatioSlider cropper={cropper} />}
            {instrument === 'Rotate' && <Rotate cropper={cropper} />}
            {instrument === 'Mirror' && <Mirror cropper={cropper} />}
            <div className='instrumentsSection'>
              <div className='instrument' onClick={() => setInstrument('Scissors')}>Crop</div>
              <div className='instrument' onClick={() => setInstrument('Rotate')}>Rotate</div>
              <div className='instrument' onClick={() => setInstrument('Mirror')}>Mirror</div>
            </div>
          </div>

        </div>
        <div className='contentOpacity' />
      </IonContent>
    </IonPage>
  );
};

export default ReCropper;

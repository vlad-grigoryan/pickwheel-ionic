import { IonContent, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { StatusBar } from '@capacitor/status-bar';
import { IonImg, IonLabel } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import ReCropper from '../ReCropper';
import './style.css';

interface ContainerProps { }

const Home: React.FC<ContainerProps> = () => {
  StatusBar.setOverlaysWebView({ overlay: true });
  const [animation, setAnimation] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>('');
  const [imageFormat, setImageFormat] = useState<string>('');

  const openCamera = async () => {
    await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      saveToGallery: false,
    })
      .then(item => {
        const path = item.dataUrl ? item.dataUrl : item.webPath;
        setImageURL(Capacitor.convertFileSrc(path!));
        setImageFormat(item.format);
      })
      .catch((error) => console.log('Error sharing ::: ', error))
  };

  const choosePhoto = async () => {
    await Camera.pickImages({
      quality: 100,
      // presentationStyle: 'popover', //does not working for android
      limit: 1 //does not working for android
    })
      .then(item => {
        if (item.photos[0]) {
          const path = item.photos[0].path ? item.photos[0].path : item.photos[0].webPath
          setImageURL(Capacitor.convertFileSrc(path));
          setImageFormat(item.photos[0].format);
        }
      })
      .catch((error) => console.log('Error sharing ::: ', error))
  };

  useEffect(() => {
    setAnimation(true);
  }, []);

  if (imageURL) {
    return <ReCropper imgUrl={imageURL} imgFormat={imageFormat} />
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='mainContainer'>
          <IonImg
            className='title'
            src={require('../../assets/animation/Picwheel.png')}
          />
          <div className='buttonsConatiner'>
            <div className={`buttonContent button1 ${animation && 'buttonDone'}`} onClick={choosePhoto}>
              <IonLabel className='buttonTitle'>Photo</IonLabel>
              <IonImg
                className='icons'
                src={require('../../assets/animation/photo.png')}
              />
            </div>
            <div className={`buttonContent button2 ${animation && 'buttonDone'}`} onClick={openCamera}>
              <IonLabel className='buttonTitle'>Camera</IonLabel>
              <IonImg
                className='icons'
                src={require('../../assets/animation/camera.png')}
              />
            </div>

            {/* <div className={`buttonContent button3 ${animation && 'buttonDone'}`} onClick={() => { }}>
              <IonLabel className='buttonTitle'>Collage</IonLabel>
              <IonImg
                className='icons'
                src={require('../../assets/animation/collage.png')}
              />
            </div>

            <div className={`buttonContent button4 ${animation && 'buttonDone'}`} onClick={() => { }}>
              <IonLabel className='buttonTitle'>AR Camera</IonLabel>
              <IonImg
                className='icons'
                src={require('../../assets/animation/arcam.png')}
              />
            </div> */}
          </div>

          <div className={`wheelCircuit1 ${animation && 'animatedWheel'}`}>
            <IonImg className='wheelImg' src={require('../../assets/animation/wheelCircuit1.png')} />
          </div>

          <div className={`wheelCircuit2 ${animation && 'animatedWheel'}`}>
            <IonImg className='wheelImg' src={require('../../assets/animation/wheelCircuit2.png')} />
          </div>

          <div className='contentOpacity' />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

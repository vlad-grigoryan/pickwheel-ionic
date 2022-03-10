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
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      saveToGallery: true,
      allowEditing: true,
    });
    
    setImageURL(capturedPhoto.webPath!);
  };

  const choosePhoto = async () => {
    const capturedPhoto = await Camera.pickImages({
      quality: 100,
      // presentationStyle: 'popover', //does not working for android
      limit: 1 //does not working for android
    });
    if (capturedPhoto.photos[0]){
      const path = capturedPhoto.photos[0].path? capturedPhoto.photos[0].path : capturedPhoto.photos[0].webPath
      setImageURL(Capacitor.convertFileSrc(path));
      setImageFormat(capturedPhoto.photos[0].format);
    }
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
            src={require('../../assets/Picwheel.png')}
          />
          <div className='buttonsConatiner'>
            <div className={`buttonContent button1 ${animation && 'buttonDone'}`} onClick={choosePhoto}>
              <IonLabel className='buttonTitle'>Photo</IonLabel>
              <IonImg
                className='icons'
                src={require('../../assets/icons/photo.png')}
              />
            </div>
            <div className={`buttonContent button2 ${animation && 'buttonDone'}`} onClick={openCamera}>
              <IonLabel className='buttonTitle'>Camera</IonLabel>
              <IonImg
                className='icons'
                src={require('../../assets/icons/camera.png')}
              />
            </div>

            <div className={`buttonContent button3 ${animation && 'buttonDone'}`} onClick={() => { }}>
              <IonLabel className='buttonTitle'>Collage</IonLabel>
              <IonImg
                className='icons'
                src={require('../../assets/icons/collage.png')}
              />
            </div>

            <div className={`buttonContent button4 ${animation && 'buttonDone'}`} onClick={() => { }}>
              <IonLabel className='buttonTitle'>AR Camera</IonLabel>
              <IonImg
                className='icons'
                src={require('../../assets/icons/arcam.png')}
              />
            </div>
          </div>

          <div className={`wheelCircuit1 ${animation && 'animatedWheel'}`}>
            <IonImg className='wheelImg' src={require('../../assets/wheelCircuit1.png')} />
          </div>

          <div className={`wheelCircuit2 ${animation && 'animatedWheel'}`}>
            <IonImg className='wheelImg' src={require('../../assets/wheelCircuit2.png')} />
          </div>

          <div className='contentOpacity' />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

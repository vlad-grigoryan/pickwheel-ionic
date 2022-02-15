import './ExploreContainer.css';
import { useEffect, useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { StatusBar } from '@capacitor/status-bar';
import { IonImg, IonLabel } from '@ionic/react';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  StatusBar.setOverlaysWebView({ overlay: true });
  const [animation, setAnimation] = useState(false);

  const openCamera = async () => {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      saveToGallery: true,
      allowEditing: true
    });
  }

  const choosePhoto = async () => {
    const capturedPhoto = await Camera.pickImages({
      quality: 100,
      // presentationStyle: 'popover', //does not working for android
      limit: 1 //does not working for android
    });
  };

  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <div className='mainContainer'>
      <IonImg
        className='title'
        src={require('../assets/Picwheel.png')}
      />
      <div className='buttonsConatiner'>
        <div className={`buttonContent button1 ${animation && 'buttonDone'}`} onClick={choosePhoto}>
          <IonLabel className='buttonTitle'>Photo</IonLabel>
          <IonImg
            className='icons'
            src={require('../assets/icons/photo.png')}
          />
        </div>
        <div className={`buttonContent button2 ${animation && 'buttonDone'}`} onClick={openCamera}>
          <IonLabel className='buttonTitle'>Camera</IonLabel>
          <IonImg
            className='icons'
            src={require('../assets/icons/camera.png')}
          />
        </div>

        <div className={`buttonContent button3 ${animation && 'buttonDone'}`} onClick={() => { }}>
          <IonLabel className='buttonTitle'>Collage</IonLabel>
          <IonImg
            className='icons'
            src={require('../assets/icons/collage.png')}
          />
        </div>

        <div className={`buttonContent button4 ${animation && 'buttonDone'}`} onClick={() => { }}>
          <IonLabel className='buttonTitle'>AR Camera</IonLabel>
          <IonImg
            className='icons'
            src={require('../assets/icons/arcam.png')}
          />
        </div>
      </div>

      <div className={`wheelCircuit1 ${animation && 'animatedWheel'}`}>
        <IonImg className='wheelImg' src={require('../assets/wheelCircuit1.png')} />
      </div>

      <div className={`wheelCircuit2 ${animation && 'animatedWheel'}`}>
        <IonImg className='wheelImg' src={require('../assets/wheelCircuit2.png')} />
      </div>

      <div className='contentOpacity' />
    </div>
  );
};

export default ExploreContainer;

import { StatusBar } from '@capacitor/status-bar';
import { IonContent, IonPage, IonImg } from '@ionic/react';
import { useState, useEffect } from 'react';
import './style.css';

const WelcomeScreen: React.FC = () => {
  StatusBar.setOverlaysWebView({ overlay: true });

  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
      <div className='welcomeContainer'>
        <div className={`smallOne ${animation && 'scaling'}`}>
          <div className={`smallWheel ${animation && 'rotateWheel'}`}>
            <IonImg className='wheelImg' src={require('../../assets/animation/wheel_1.png')} />
          </div>
          <IonImg className='smallLens' src={require('../../assets/animation/lens_1.png')} />
        </div>

        <div className={`appName ${animation && 'animatedAppName'}`}>
          <IonImg className='wheelImg' src={require('../../assets/animation/Picwheel.png')} />
        </div>

        <div className={`bigOne ${animation && 'scaling'}`}>
          <div className={`bigWheel ${animation && 'rotateWheel'}`}>
            <IonImg className='wheelImg' src={require('../../assets/animation/wheel_2.png')} />
          </div>
          <IonImg className='bigLens' src={require('../../assets/animation/lens_2.png')} />
        </div>

        <div className='contentOpacity' />
      </div>
      </IonContent>
    </IonPage>
  );
};

export default WelcomeScreen;

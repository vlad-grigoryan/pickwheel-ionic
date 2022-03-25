import { IonImg } from '@ionic/react';
import { useState } from 'react';

import './style.css';

const Mirror = ({ cropper }: { cropper: any }) => {
  const [scaleX, setScaleX] = useState<number>(1);
  const [scaleY, setScaleY] = useState<number>(1);

  return (
    <div className='mirror'>
      <IonImg
        onClick={() => { setScaleX(-scaleX); cropper.scaleX(scaleX); }}
        className='icon'
        src={require('../../assets/icons/rotate/horizontalMirror.png')}
      />
      <IonImg
        onClick={() => { setScaleY(-scaleY); cropper.scaleY(-scaleY); }}
        className='icon'
        src={require('../../assets/icons/rotate/verticalMirror.png')}
      />
    </div>
  )
};

export default Mirror;
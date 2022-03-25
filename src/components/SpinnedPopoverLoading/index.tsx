import { IonSpinner, IonPopover } from '@ionic/react';

import './style.css';

const SpinnedPopoverLoading = ({ loading }: { loading: boolean }) => {  
  return (
    <IonPopover
      className='popover'
      isOpen={loading}
    >
      <IonSpinner name="lines" className='spinner'/>
    </IonPopover>
  )
};

export default SpinnedPopoverLoading;

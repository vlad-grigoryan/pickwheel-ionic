import './ExploreContainer.css';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';


interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {

  const openCamera = async () => {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  }

  const  addNewToGallery = async () => {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100
    });
  }
  return (
    <div className="container">
      <div>
      <button onClick={openCamera}>open Camera</button>
      </div>
      <div>
        <button onClick={addNewToGallery}>open Gallery</button>
      </div>
    </div>
  );
};

export default ExploreContainer;

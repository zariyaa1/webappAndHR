import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import UploadIcon from "../assets/icons/uploadImage.svg"

const ImageUploaderComponent = ({ onImageAdded, onImageRemoval }) => {
  function getImageFileObject(imageFile) {
    if (onImageAdded) {
      onImageAdded(imageFile);
    }
  }

  function runAfterImageDelete(file) {
    if (onImageRemoval) {
      onImageRemoval(file);
    }
  }

  return (
    <ImageUploader
      onFileAdded={(img) => getImageFileObject(img)}
      onFileRemoved={(img) => runAfterImageDelete(img)}
      style={{
        borderRadius: "10px",
        height: "20vh",
        width: "38vw",
        background: "#FD939F",
      }}
      deleteIcon={<DeleteOutlineOutlinedIcon />}
      uploadIcon={<CloudUploadOutlinedIcon />}
    />
  );
};

export default ImageUploaderComponent;

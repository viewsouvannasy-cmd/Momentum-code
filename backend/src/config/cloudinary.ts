import { v2 as cloudinary } from "cloudinary";
import {
  getCloudinaryName,
  getCloudinaryApi,
  getCloudinarySecsetKey,
} from "../utils/getEnv.js";

cloudinary.config({
  cloud_name: getCloudinaryName(),
  api_key: getCloudinaryApi(),
  api_secret: getCloudinarySecsetKey(),
});

export default cloudinary;

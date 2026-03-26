import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true, // .env se auto pick karega
});

export default cloudinary;
import fs from 'fs';

// uploadImage api which should receive a file then add it to file system and return the path of the image
export default async function uploadImage(
  id: string,
  folder: string,
  image: Express.Multer.File,
): Promise<string> {
  const extension = image.originalname.split('.').pop();

  // maybe an issue with sync
  if (!fs.existsSync(`${process.cwd()}/public/images/${folder}`)) {
    fs.mkdirSync(`${process.cwd()}/public/images/${folder}`);
  }
  if (
    fs.existsSync(`${process.cwd()}/public/images/${folder}/${id}.${extension}`)
  ) {
    fs.rmSync(`${process.cwd()}/public/images/${folder}/${id}.${extension}`);
  }
  fs.writeFile(
    `${process.cwd()}/public/images/${folder}/${id}.${extension}`,
    image.buffer,
    function (err) {
      if (err) {
        return console.error(err);
      }
    },
  );

  return `/images/${folder}/${id}.${extension}`;
}

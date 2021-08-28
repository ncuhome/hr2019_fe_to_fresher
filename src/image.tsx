/**
 * 图片资源预加载
 */
const loadImage = (cb: Function) => {
  let count = 0;

  const increase = () => {
    count++;
    cb(count, pictureLength);
  };

  // window.IMAGES_DATA is defined by vite-plugin-image-url
  const pictures: string[] = (window as any).IMAGES_DATA;
  const pictureLength = pictures.length;

  // load images by urls
  pictures.forEach((item) => {
    const pic = new Image();
    pic.onload = increase;
    pic.onerror = increase;
    pic.src = item;
  });
};

export default loadImage;

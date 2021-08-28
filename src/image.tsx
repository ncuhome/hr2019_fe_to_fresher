const loadImage = (cb: Function) => {
  // 使用上下文
  let count = 0;
  const pictures: string[] = (window as any).IMAGES_DATA;
  const pictureLength = pictures.length;
  pictures.forEach((item) => {
    const pic = new Image();
    pic.onload = () => {
      count++;
      cb(count, pictureLength);
    };
    pic.onerror = () => {
      count++;
      cb(count, pictureLength);
    }
    pic.src = item;
  });
  return;
};

export default loadImage;

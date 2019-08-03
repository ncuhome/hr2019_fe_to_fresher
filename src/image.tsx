export default function loadImage(cb:any) {
  // 使用上下文
  let count:number = 0;
  const pictures = require.context('./assets/',true, /\.(svg|jpg|png)$/);
  const pictureLength = pictures.keys().length;
  pictures.keys().forEach((key) => {
    const pic = new Image();
    pic.onload = () => {count++;cb(count,pictureLength)};
    pic.src = pictures(key);
  });
  return ;
}
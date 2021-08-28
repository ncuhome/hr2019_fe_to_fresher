import dirTree from "directory-tree";
import path from "path";

function formatPath(pathStr) {
  return process.platform === "win32"
    ? pathStr.split(path.sep).join("/")
    : pathStr;
}

export const generateIndexFile = (isBuild = false) => {
  const src = path.resolve(__dirname, "../src/assets");
  const list = [];

  const reduce = (value) => {
    if (value.children) {
      value.children.forEach((i) => {
        reduce(i);
      });
    }

    if (value && value.type !== "directory") {
      const url = isBuild ? `assets/${value.name}` : formatPath(
        path.relative(path.resolve(__dirname, ".."), value.path)
      ) ;
      list.push(`/${url}`);
    }
  };

  const stats = dirTree(src, {
    extensions: /\.(png|tiff|jpg|gif|svg|webp)$/,
  });

  reduce(stats, list);

  return JSON.stringify(list);
};

export const imageUrlPlugin = () => {
  const isBuild = process.env.NODE_ENV === "production";

  return {
    name: "vite-plugin-image-url",
    config(cfg) {
      cfg.define = {
        "window.IMAGES_DATA": generateIndexFile(isBuild),
      };
    },
  };
};

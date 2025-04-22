import { Router } from "express";
import { readdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const removeExt = (filename) => {
  return filename.split(".").shift();
};

const PATH = __dirname;

readdirSync(PATH).filter((filename) => {
  const name = removeExt(filename);

  if (name !== "index") {
    import(`./${filename}`).then((module) => {
      router.use(`/${name}`, module.default);
    });
  }
});

export default router;

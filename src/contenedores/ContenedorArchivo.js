import { promises as fs } from "fs";
import config from "../config.js";

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = `${config.fileSystem.path}/${ruta}`;
  }

  async listar(id) {
    const objs = await this.listarAll();
    const filtrarId = objs.find((x) => x.id == id);
    return filtrarId;
  }

  async listarAll() {
    try {
      const objs = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      return [];
    }
  }

  async guardar(obj) {
    const objs = await this.listarAll();

    let newId;
    if (objs.length == 0) {
      newId = 1;
    } else {
      newId = objs[objs.length - 1].id + 1;
    }

    const newObj = { ...obj, id: newId };
    objs.push(newObj);

    try {
      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      return newObj;
    } catch (err) {
      throw new Error(`Error al guardar: ${err}`);
    }
  }

  async actualizar(elem) {
    const objs = await this.listarAll();
    const index = objs.findIndex((o) => o.id == elem.id);
    if (index == -1) {
      throw new Error(`Error al actualizar: no se encontró el id: ${id}`);
    } else {
      objs[index] = elem;
      try {
        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      } catch (err) {
        throw new Error(`Error al actualizar: ${err}`);
      }
    }
  }

  async borrar(id) {
    const objs = await this.listarAll();
    const index = objs.findIndex((o) => o.id == id);
    if (index == -1) {
      throw new Error(`Error al borrar: no se encontró el id: ${id}`);
    }

    objs.splice(index, 1);
    try {
      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
    } catch (err) {
      throw new Error(`Error al borrar: ${err}`);
    }
  }

  async borrarAll() {
    try {
      await fs.writeFile(this.ruta, JSON.stringify([], null, 2));
    } catch (err) {
      throw new Error(`Error al borrar todo: ${err}`);
    }
  }
}

export default ContenedorArchivo;

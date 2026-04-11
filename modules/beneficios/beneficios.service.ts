import Beneficio from "./beneficios.model";

// Obtener los benficios
export const getAll = () => Beneficio.find();

// Obtener benficios por id
export const getById = (id: string) => Beneficio.findById(id);

// Crear un beneficio
export const createOne = (data: any) => {
  const beneficio = new Beneficio(data);
  return beneficio.save();
};

// Crear varios beneficios
export const createMany = (data: any[]) => {
  return Beneficio.insertMany(data);
};

// Actualizar
export const update = (id: string, data: any) => {
  return Beneficio.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Eliminar
export const remove = (id: string) => {
  return Beneficio.findByIdAndDelete(id);
};

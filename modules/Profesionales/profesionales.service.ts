import Profesional from "./profesionales.model";

// Obtener los benficios
export const getAll = () => Profesional.find();

// Obtener benficios por id
export const getById = (id: string) => Profesional.findById(id);

// Crear un Profesional
export const createOne = (data: any) => {
  const profesional = new Profesional(data);
  return profesional.save();
};

// Crear varios Profesionals
export const createMany = (data: any[]) => {
  return Profesional.insertMany(data);
};

// Actualizar
export const update = (id: string, data: any) => {
  return Profesional.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Eliminar
export const remove = (id: string) => {
  return Profesional.findByIdAndDelete(id);
};

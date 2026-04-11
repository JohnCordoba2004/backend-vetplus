import Clinica from "./clinica.models";

// Obtener
export const getAll = () => Clinica.find();
export const getById = (id: string) => Clinica.findById(id);
export const createOne = (data: any) => {
  const clinica = new Clinica(data);
  return clinica.save();
};
export const createMany = (data: any) => {
  return Clinica.insertMany(data);
};
export const update = (id: string, data: any) => {
  return Clinica.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};
export const remove = (id: string) => {
  return Clinica.findByIdAndDelete(id);
};

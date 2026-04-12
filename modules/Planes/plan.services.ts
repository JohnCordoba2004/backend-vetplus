import Plan from "./plan.models";

//Obtener todos los planes y plans con id
export const getALL = () => Plan.find();
export const getById = (id: string) => Plan.findById(id);

// Crear planes y crear varios
export const createOne = (data: any) => {
  const plan = new Plan(data);
  return plan.save();
};

export const createMany = (data: any[]) => {
  return Plan.insertMany(data);
};

// Por tipo
export const obtenerPlanesPorTipo = (tipo: string) => {
  return Plan.find({ type: tipo });
};

/* export const crearPorTipo = async (tipo: any, data: any) => {
  const existe = await Plan.findOne({ tipo });

  if (existe) {
    throw new Error("Ya existe un plan de este tipo");
  }

  return await Plan.create({ tipo, ...data });
}; */

// Actualizar
export const update = (id: string, data: any) => {
  return Plan.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Eliminar
export const remove = (id: string) => {
  return Plan.findByIdAndDelete(id);
};

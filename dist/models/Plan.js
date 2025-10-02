"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PlanSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: { values: ["dog", "cat"], message: "El tipo debe ser 'dog' o 'cat'" },
        required: [true, "El tipo es obligatorio"],
    },
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        minlenght: [3, "El nombre debe tener al menos 3 caracteres"],
    },
    benefits: {
        type: [String],
        required: [true, "Debe incluir al menos un beneficio"],
        validate: {
            validator: (arr) => arr.length > 0,
            message: "Debe incluir al menos un beneficio",
        },
    },
    price: {
        type: Number,
        required: [true, "El precio es obligatorio"],
        min: [1000, "El precio debe ser mayor o igual a 1000"],
    },
    img: {
        type: String,
        required: [true, "La imagen es obligatoria"],
        validate: {
            validator: (value) => /^(http|https):\/\/[^ "]+$/.test(value),
            message: "La imagen debe ser una URL valida",
        },
    },
});
exports.default = (0, mongoose_1.model)("Plan", PlanSchema);

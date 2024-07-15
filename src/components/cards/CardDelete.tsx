"use client";
import React from "react";

interface CardProps {
  nombre: string;
  especialidad: string;
  cedula: string;
  icon: any;
  onDelete: () => void;
}

function Card({ nombre, especialidad, cedula, icon, onDelete }: CardProps) {
  return (
    <div className="container mx-auto bg-white flex items-center justify-between m-2 rounded-md p-2 w-full shadow-md">
      <div className="flex items-center justify-between p-1">
        <div className="flex justify-center items-center mr-3 bg-black/80 p-5 rounded-md">
          {icon}
        </div>
        <div>
          <h2 className="font-bold text-black text-md">
            {nombre} ({especialidad})
          </h2>
          <p className="text-black"></p>
          <p className="text-black">{cedula}</p>
        </div>
      </div>
      <div className="flex">
        <button
          className="flex bg-red-500 rounded-md justify-between items-center p-2 mr-2"
          onClick={onDelete}
        >
          <div className="text-white">Eliminar</div>
        </button>
      </div>
    </div>
  );
}

export default Card;

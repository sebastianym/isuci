"use client"; 
import React from "react";
import { IoBicycle } from "react-icons/io5";

interface CardProps {
  nombre: string;
  especialidad: string;
  cedula: string;
  icon: any;
  onAdd: () => void;
}

function Card({ nombre, especialidad, cedula, icon, onAdd }: CardProps) {
  return (
    <div className="container mx-auto bg-secondary-blue dark:bg-gray-800 flex items-center justify-between m-2 rounded-md p-2 w-full">
      <div className="flex items-center justify-between p-1">
        <div className="flex justify-center items-center mr-3 bg-black p-5 rounded-md">
          <IoBicycle size="30px" style={{ color: "white" }} />
        </div>
        <div>
          <h2 className="font-bold text-black dark:text-white text-md">
            {nombre} ({especialidad})
          </h2>
          <p className="text-gray-800 dark:text-gray-300">{cedula}</p>
        </div>
      </div>
      <div className="flex">
        <button
          className="flex  bg-dash-back dark:bg-slate-700 rounded-md justify-between items-center p-2 mr-2"
          onClick={onAdd}
        >
          <div className="text-black dark:text-white ">Seleccionar</div>
        </button>
      </div>
    </div>
  );
}

export default Card;

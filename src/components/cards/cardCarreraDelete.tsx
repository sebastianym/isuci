"use client";
import { IoBicycle } from "react-icons/io5";

interface CardProps {
  nombre: string;
  tipoCarrera: string;
  icon: any;
  onDelete: () => void;
}

function Card({ nombre, tipoCarrera, icon, onDelete }: CardProps) {
  return (
    <div className="container mx-auto bg-white flex items-center justify-between m-2 rounded-md p-2 w-full shadow-md">
      <div className="flex items-center justify-between p-1">
        <div className="flex justify-center items-center mr-3 bg-black/80 p-5 rounded-md">
          {icon}
        </div>
        <div>
          <h2 className="font-bold text-black text-md">
            {nombre}
          </h2>
          <p className="text-black"></p>
          <p className="text-black">{tipoCarrera}</p>
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

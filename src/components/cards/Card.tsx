"use client";
import React from "react";
import { IoBicycle } from "react-icons/io5";

interface CardProps {
  nombre: string;
  especialidad: string;
  icon: any;
}

function Card({ nombre, especialidad, icon }: CardProps) {
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
        </div>
      </div>
    </div>
  );
}

export default Card;

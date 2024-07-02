import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
interface Params {
  params: { id: string };
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { correoElectronico, contrasena } = await request.json();
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: "f1c7b1b30da59d",
        pass: "ea723c29fc39cb",
      },
    });

    const mailOptions = {
      from: "isuci@isuci.com",
      to: correoElectronico,
      subject: "Aquí están tus credenciales de acceso",
      text:
        "Correo Electrónico: " +
        correoElectronico +
        " Contraseña: " +
        contrasena,
      html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f0f0f0;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    h1 {
                        color: #333333;
                        text-align: center;
                    }
                    p {
                        font-size: 18px;
                        line-height: 1.6;
                        color: #555555;
                    }
                    .credentials {
                        margin-top: 20px;
                        background-color: #f9f9f9;
                        padding: 15px;
                        border-radius: 8px;
                        box-shadow: 0 0 5px rgba(0,0,0,0.05);
                    }
                    .credentials p {
                        margin: 5px 0;
                        font-size: 16px;
                        color: #333333;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Credenciales de Acceso</h1>
                    <div class="credentials">
                        <p><strong>Correo Electrónico:</strong> ${correoElectronico}</p>
                        <p><strong>Contraseña:</strong> ${contrasena}</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    };

    const info = await transport.sendMail(
      mailOptions,
      function (error: any, info: { response: string }) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );

    return NextResponse.json(info);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

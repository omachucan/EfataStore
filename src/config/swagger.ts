import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions, SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.3",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "API Docs for Products",
    },
    servers: [{ url: "/" }],
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
  .topbar-wrapper .link {
      // content: url('https://assets.niubiz.com.pe/assets/8c0e92bf-725d-4713-ab7f-e353d28941e0');
      content: url('https://assets.niubiz.com.pe/assets/8c0e92bf-725d-4713-ab7f-e353d28941e0');
      height: 80px;
      width: auto;
  }

      .swagger-ui .topbar {
          background-color : #bf770aff
      }
  `,
  customSiteTitle: "Documentación REST API Express / TypeScript",
};

export default swaggerSpec;
export { swaggerUiOptions };

const prisma = require("./src/config/db");
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const shutDown = async () => {
  console.log("Shutting down server...");

  try {
    await prisma.$disconnect();
    console.log("Prisma disconnected.");
  } catch (error) {
    console.error("Error disconnecting Prisma:", error);
  }

  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};


process.on("SIGINT", shutDown); 


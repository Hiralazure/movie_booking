import { createApplication } from "./app";

function main() {
  try {
    const app = createApplication();
    const PORT = Number(process.env.PORT) || 3000;
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

    server.on("error", (err: any) => {
      console.error("Server error:", err);
      process.exit(1);
    });
  } catch (err) {
    console.log("Error in starting server:", err);
    throw Error;
  }
}

main();

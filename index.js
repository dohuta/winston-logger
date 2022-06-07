const Logger = require("./logger");

const loggerA = new Logger("A");
const loggerB = new Logger("B");

loggerA.debug("Hello World");
loggerA.debug("Hello World", { foo: "bar" });
loggerA.info("Hello World");
loggerA.info("Hello World", { foo: "bar" });
loggerA.warn("Hello World");
loggerA.warn("Hello World", { foo: "bar" });
loggerA.error("Hello World");
loggerA.error("Hello World", new Error("testing"));


loggerB.debug("Hello World");
loggerB.debug("Hello World", { foo: "bar" });
loggerB.info("Hello World");
loggerB.info("Hello World", { foo: "bar" });
loggerB.warn("Hello World");
loggerB.warn("Hello World", { foo: "bar" });
loggerB.error("Hello World");
loggerB.error("Hello World", new Error("testing"));

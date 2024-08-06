import { api } from "./server/server";

api.listen(3030, () => {
  console.log("TCL: RODANDO");
});

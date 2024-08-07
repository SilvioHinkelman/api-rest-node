import { api } from "./server/api";

api.listen(3030, () => {
  console.log("TCL: RODANDO");
});

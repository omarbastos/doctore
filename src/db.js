const db = require("mongoose");
const MONGO_URI = `mongodb+srv://doctoreadmin:!$qjbQt8DfEAsPQ@cluster0-0p7bv.mongodb.net/test?retryWrites=true&w=majority`;

db.Promise = global.Promise;
async function connect() {
  await db.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log("[db] Conectada con exito");
}

module.exports = connect;

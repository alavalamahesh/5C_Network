`use strict`;

const appConfig = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV && process.env.NODE_ENV.trim() || "test",
};

const DbConfig = {
    Url:'mongodb+srv://maheshDB:Brillio123@cluster0-aw04j.mongodb.net/test?retryWrites=true&w=majority',
    dataBase:"Cluster0",
    collection:"Github"
}

module.exports = {
    appConfig,
    DbConfig,

};
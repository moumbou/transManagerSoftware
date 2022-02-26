const path = require("path");
const mongoose = require("mongoose");

const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const isDev = require("electron-is-dev");
const {
  constants,
  requests,
} = require("../src/constants/IpcRendererConstants");
const chaffeurFunctions = require("../DB/ChauffeurFunctions");
const camionFunctions = require("../DB/CamionFunctions");
const situationFunctions = require("../DB/SituationFunctions");

let win = null;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 600,
    minWidth: 1024,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    titleBarStyle: "hidden",
    title: false,
    show: false,
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  win.on("maximize", () => {
    win.webContents.send(constants.MAXIMIZE_WINDOW);
  });

  win.on("unmaximize", () => {
    win.webContents.send(constants.NORMALIZE_WINDOW);
  });
}

//* CONNECTING TO DATA BASE
mongoose.connect("mongodb://localhost:27017/trans_manager", async (err) => {
  if (err)
    return dialog.showErrorBox(`erreur l'ors de la connexion a la BDD`, err.message);
  console.log("connected to data base successfully !");
  win.webContents.on("did-finish-load", async (e) => {
    win.show();
    const situations = await situationFunctions.GetAllSituations();
    e.sender.send(requests.GET_SITUATIONS, JSON.stringify(situations));
  });
});

//* IPCMAIN FUNCTIONS

//? WINDOW FUNCTIONS
ipcMain.on(constants.EXIT_APP, () => {
  win.close();
});

ipcMain.on(constants.MAXIMIZE_WINDOW, () => {
  win.maximize();
});

ipcMain.on(constants.MINIMIZE_WINDOW, () => {
  win.minimize();
});

ipcMain.on(constants.NORMALIZE_WINDOW, () => {
  win.unmaximize();
});

ipcMain.on(constants.SHOW_DEV_TOOLS, () => {
  win.webContents.openDevTools({ mode: "detach" });
});
//?----------------*//

//? DRIVER FUNCTIONS
ipcMain.on(requests.ADD_DRIVER, async (e, args) => {
  const chauffeur = await chaffeurFunctions.AddChauffeur(args);

  const chauffeurs = await chaffeurFunctions.GetChauffeurs();
  e.sender.send(requests.DISPLAY_DRIVERS, JSON.stringify(chauffeurs));
  e.sender.send(requests.MESSAGE_SEND, chauffeur);
});

ipcMain.on(requests.DISPLAY_DRIVERS, async (e) => {
  const chauffeurs = await chaffeurFunctions.GetChauffeurs();
  e.sender.send(requests.DISPLAY_DRIVERS, JSON.stringify(chauffeurs));
});

ipcMain.on(requests.DELETE_DRIVER, async (e, args) => {
  const result = await chaffeurFunctions.DeleteChauffeur(args);
  e.sender.send(requests.MESSAGE_SEND, result);

  const chauffeurs = await chaffeurFunctions.GetChauffeurs();
  e.sender.send(requests.DISPLAY_DRIVERS, JSON.stringify(chauffeurs));
});

ipcMain.on(requests.UPDATE_DRIVER, async (e, args) => {
  const result = await chaffeurFunctions.UpdateDriver(args);
  e.sender.send(requests.MESSAGE_SEND, result);

  if (!result.success) return;
  const drivers = await chaffeurFunctions.GetChauffeurs();
  e.sender.send(requests.DISPLAY_DRIVERS, JSON.stringify(drivers));
});
//?------------------*//

//? TRUCK FUNCTIONS
ipcMain.on(requests.DISLPAY_TRUCKS, async (e) => {
  const trucks = await camionFunctions.DisplayTrucks();
  e.sender.send(requests.DISLPAY_TRUCKS, JSON.stringify(trucks));
});

ipcMain.on(requests.ADD_TRUCK, async (e, args) => {
  const result = await camionFunctions.AddTruck(args);
  e.sender.send(requests.MESSAGE_SEND, result);

  if (!result.success) return;
  const trucks = await camionFunctions.DisplayTrucks();
  e.sender.send(requests.DISLPAY_TRUCKS, JSON.stringify(trucks));
});

ipcMain.on(requests.DELETE_TRUCK, async (e, args) => {
  const result = await camionFunctions.DeleteTruck(args);
  e.sender.send(requests.MESSAGE_SEND, result);

  if (!result.success) return;
  const trucks = await camionFunctions.DisplayTrucks();
  e.sender.send(requests.DISLPAY_TRUCKS, JSON.stringify(trucks));
});

ipcMain.on(requests.UPDATE_TRUCK, async (e, args) => {
  const result = await camionFunctions.UpdateTruck(args);
  e.sender.send(requests.MESSAGE_SEND, result);

  if (!result.success) return;
  const trucks = await camionFunctions.DisplayTrucks();
  e.sender.send(requests.DISLPAY_TRUCKS, JSON.stringify(trucks));
});
//?-----------------*//

//? SITUATION FONCTIONS //
ipcMain.on(requests.GET_AFFILIED_TRUCKS, async (e) => {
  const trucks = await camionFunctions.getAffiliedTrucks();
  e.sender.send(requests.GET_AFFILIED_TRUCKS, JSON.stringify(trucks));
});

ipcMain.on(requests.ADD_SITUATION, async (e, args) => {
  const result = await situationFunctions.addSituation(args);
  e.sender.send(requests.MESSAGE_SEND, result);

  if (!result.success) return;
  const situations = await situationFunctions.GetAllSituations();
  e.sender.send(requests.GET_SITUATIONS, JSON.stringify(situations));
});

ipcMain.on(requests.GET_SITUATIONS, async (e) => {
  const situations = await situationFunctions.GetAllSituations();
  e.sender.send(requests.GET_SITUATIONS, JSON.stringify(situations));
});

ipcMain.on(requests.UPDATE_SITUATION, async (e, args) => {
  const result = await situationFunctions.UpdateSituation(args);
  e.sender.send(requests.MESSAGE_SEND, result);

  if (!result.success) return;

  const situations = await situationFunctions.GetAllSituations();
  e.sender.send(requests.GET_SITUATIONS, JSON.stringify(situations));
});

ipcMain.on(requests.DELTE_SITUATION, async (e, args) => {
  const result = await situationFunctions.DeleteSituation(args);
  e.sender.send(requests.MESSAGE_SEND, result);

  if (!result.success) return;

  const situations = await situationFunctions.GetAllSituations();
  e.sender.send(requests.GET_SITUATIONS, JSON.stringify(situations));
});
//?--------------------*//

//*------------------*//

//* APP FUNCTIONS
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
//*------------------*//

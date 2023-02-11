const router = require("express").Router();
const Home = require('../../controllers/Home')

// Hero
router.post("/hero/create", Home.Hero.create);
router.get("/hero/read", Home.Hero.read);
router.put("/hero/update", Home.Hero.update);
router.delete("/hero_card/delete", Home.Hero.delete);

// MobileApp
router.post("/mobile_app/create", Home.MobileApp.create);
router.get("/mobile_app/read", Home.MobileApp.read);
router.put("/mobile_app/update", Home.MobileApp.update);
router.delete("/mobile_app/delete", Home.MobileApp.delete);

// ServiceApp
router.post("/service_app/create", Home.ServiceApp.create);
router.get("/service_app/read", Home.ServiceApp.read);
router.put("/service_app/update", Home.ServiceApp.update);
router.delete("/service_app/delete", Home.ServiceApp.delete);

// Benifit
router.post("/benifit/create", Home.Benifit.create);
router.get("/benifit/read", Home.Benifit.read);
router.put("/benifit/update", Home.Benifit.update);
router.delete("/benifit/delete", Home.Benifit.delete);

// Location
router.post("/location/create", Home.Location.create);
router.get("/location/read", Home.Location.read);
router.put("/location/update", Home.Location.update);
router.delete("/location/delete", Home.Location.delete);

// CustomerSpeak
router.post("/customer_speak/create", Home.CustomerSpeak.create);
router.get("/customer_speak/read", Home.CustomerSpeak.read);
router.put("/customer_speak/update", Home.CustomerSpeak.update);
router.delete("/customer_speak/delete", Home.CustomerSpeak.delete);

module.exports  = router;
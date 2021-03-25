var path = require('path');
const express = require('express')
const app = express()
const ejs=require("ejs")
const port = 4000
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var { Pool } = require("pg");
const pool = new Pool({
    "Connection Credentials"
  });

  const poolscancloud = new Pool({
  "Connection Credentials"
  });

  const poolpanel = new Pool({
    "Connection Credentials"
  });

  const poololdsmar = new Pool({
    "Connection Credentials"
  });

  const poolltycloud = new Pool({
  "Connection Credentials"
  });

  const pooldatacube = new Pool({
    "Connection Credentials"
  });


app.get("/scanretail.json", (req, res, next) => {
    pool.query("SELECT  (CASE WHEN QUERY_LEVEL IS NULL THEN 'NA' ELSE QUERY_LEVEL END) AS QUERY_LEVEL,SUM(CASE WHEN STATUS='IN_PROGRESS' THEN COUNTDTL ELSE 0 END )AS INPROGRESS,SUM(CASE WHEN STATUS IN ('WAITING','WAITING_CONCURRENT') THEN COUNTDTL ELSE 0  END ) AS WAITING, SUM(CASE WHEN STATUS IN ('COMPLETED','COMPLETED_CACHED','COMPLETED_CONCURRENT') THEN COUNTDTL ELSE 0 END )AS COMPLETED FROM(SELECT QUERY_LEVEL,STATUS, COUNT(*) COUNTDTL FROM  CISTHROTTLE GROUP BY QUERY_LEVEL,STATUS) GROUP BY QUERY_LEVEL  ORDER BY QUERY_LEVEL;", function (err, response) {
        res.json(response.rows);
       // pool.end()
    });
});

app.get("/scanretaill2.json", (req, res, next) => {
  pool.query("SELECT DATABASE_NAME,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level2' GROUP BY DATABASE_NAME ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/scanretaill3.json", (req, res, next) => {
  pool.query("SELECT DATABASE_NAME,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level3' GROUP BY DATABASE_NAME ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/scanretaill21.json", (req, res, next) => {
  pool.query("SELECT TARGET,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level2' GROUP BY TARGET ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/scanretaill31.json", (req, res, next) => {
  pool.query("SELECT TARGET,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level3' GROUP BY TARGET ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/scancloud.json", (req, res, next) => {
  poolscancloud.query("SELECT  (CASE WHEN QUERY_LEVEL IS NULL THEN 'NA' ELSE QUERY_LEVEL END) AS QUERY_LEVEL,SUM(CASE WHEN STATUS='IN_PROGRESS' THEN COUNTDTL ELSE 0 END )AS INPROGRESS,SUM(CASE WHEN STATUS IN ('WAITING','WAITING_CONCURRENT') THEN COUNTDTL ELSE 0  END ) AS WAITING, SUM(CASE WHEN STATUS IN ('COMPLETED','COMPLETED_CACHED','COMPLETED_CONCURRENT') THEN COUNTDTL ELSE 0 END )AS COMPLETED FROM(SELECT QUERY_LEVEL,STATUS, COUNT(*) COUNTDTL FROM  THROTTLE GROUP BY QUERY_LEVEL,STATUS) GROUP BY QUERY_LEVEL  ORDER BY QUERY_LEVEL;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/scancloudl2.json", (req, res, next) => {
  poolscancloud.query("SELECT DATABASE_NAME,COUNT(*) FROM THROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level2' GROUP BY DATABASE_NAME ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/scancloudl3.json", (req, res, next) => {
  poolscancloud.query("SELECT DATABASE_NAME,COUNT(*) FROM THROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level3' GROUP BY DATABASE_NAME ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/scancloudl21.json", (req, res, next) => {
  poolscancloud.query("SELECT TARGET,COUNT(*) FROM THROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level2' GROUP BY TARGET ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/scancloudl31.json", (req, res, next) => {
  poolscancloud.query("SELECT TARGET,COUNT(*) FROM THROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level3' GROUP BY TARGET ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/panel.json", (req, res, next) => {
  poolpanel.query("SELECT  (CASE WHEN QUERY_LEVEL IS NULL THEN 'NA' ELSE QUERY_LEVEL END) AS QUERY_LEVEL,SUM(CASE WHEN STATUS='IN_PROGRESS' THEN COUNTDTL ELSE 0 END )AS INPROGRESS,SUM(CASE WHEN STATUS IN ('WAITING','WAITING_CONCURRENT') THEN COUNTDTL ELSE 0  END ) AS WAITING, SUM(CASE WHEN STATUS IN ('COMPLETED','COMPLETED_CACHED','COMPLETED_CONCURRENT') THEN COUNTDTL ELSE 0 END )AS COMPLETED FROM(SELECT QUERY_LEVEL,STATUS, COUNT(*) COUNTDTL FROM  CISTHROTTLE GROUP BY QUERY_LEVEL,STATUS) GROUP BY QUERY_LEVEL  ORDER BY QUERY_LEVEL;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/panell2.json", (req, res, next) => {
  poolpanel.query("SELECT DATABASE_NAME,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level2' GROUP BY DATABASE_NAME ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/panell3.json", (req, res, next) => {
  poolpanel.query("SELECT DATABASE_NAME,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level3' GROUP BY DATABASE_NAME ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/panell21.json", (req, res, next) => {
  poolpanel.query("SELECT TARGET,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level2' GROUP BY TARGET ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/panell31.json", (req, res, next) => {
  poolpanel.query("SELECT TARGET,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level3' GROUP BY TARGET ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/oldsmar.json", (req, res, next) => {
  poololdsmar.query("SELECT  (CASE WHEN QUERY_LEVEL IS NULL THEN 'NA' ELSE QUERY_LEVEL END) AS QUERY_LEVEL,SUM(CASE WHEN STATUS='IN_PROGRESS' THEN COUNTDTL ELSE 0 END )AS INPROGRESS,SUM(CASE WHEN STATUS IN ('WAITING','WAITING_CONCURRENT') THEN COUNTDTL ELSE 0  END ) AS WAITING, SUM(CASE WHEN STATUS IN ('COMPLETED','COMPLETED_CACHED','COMPLETED_CONCURRENT') THEN COUNTDTL ELSE 0 END )AS COMPLETED FROM(SELECT QUERY_LEVEL,STATUS, COUNT(*) COUNTDTL FROM  CISTHROTTLE GROUP BY QUERY_LEVEL,STATUS) GROUP BY QUERY_LEVEL  ORDER BY QUERY_LEVEL;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/oldsmarl2.json", (req, res, next) => {
  poololdsmar.query("SELECT DATABASE_NAME,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level2' GROUP BY DATABASE_NAME ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/oldsmarl3.json", (req, res, next) => {
  poololdsmar.query("SELECT DATABASE_NAME,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level3' GROUP BY DATABASE_NAME ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/oldsmarl21.json", (req, res, next) => {
  poololdsmar.query("SELECT TARGET,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level2' GROUP BY TARGET ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/oldsmarl31.json", (req, res, next) => {
  poololdsmar.query("SELECT TARGET,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level3' GROUP BY TARGET ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/ltycloud.json", (req, res, next) => {
  poolltycloud.query("SELECT  (CASE WHEN QUERY_LEVEL IS NULL THEN 'NA' ELSE QUERY_LEVEL END) AS QUERY_LEVEL,SUM(CASE WHEN STATUS='IN_PROGRESS' THEN COUNTDTL ELSE 0 END )AS INPROGRESS,SUM(CASE WHEN STATUS IN ('WAITING','WAITING_CONCURRENT') THEN COUNTDTL ELSE 0 END ) AS WAITING, SUM(CASE WHEN STATUS IN ('COMPLETED','COMPLETED_CACHED','COMPLETED_CONCURRENT') THEN COUNTDTL ELSE 0 END )AS COMPLETED FROM(SELECT QUERY_LEVEL,STATUS, COUNT(*) COUNTDTL FROM  THROTTLE GROUP BY QUERY_LEVEL,STATUS) GROUP BY QUERY_LEVEL  ORDER BY QUERY_LEVEL;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/ltycloudl2.json", (req, res, next) => {
  poolltycloud.query("SELECT DATABASE_NAME,COUNT(*) FROM THROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level2' GROUP BY DATABASE_NAME ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/ltycloudl3.json", (req, res, next) => {
  poolltycloud.query("SELECT DATABASE_NAME,COUNT(*) FROM THROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level3' GROUP BY DATABASE_NAME ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/ltycloudl21.json", (req, res, next) => {
  poolltycloud.query("SELECT TARGET,COUNT(*) FROM THROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level2' GROUP BY TARGET ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/ltycloudl31.json", (req, res, next) => {
  poolltycloud.query("SELECT TARGET,COUNT(*) FROM THROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level3' GROUP BY TARGET ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});


app.get("/datacube.json", (req, res, next) => {
  pooldatacube.query("SELECT  (CASE WHEN QUERY_LEVEL IS NULL THEN 'NA' ELSE QUERY_LEVEL END) AS QUERY_LEVEL,SUM(CASE WHEN STATUS='IN_PROGRESS' THEN COUNTDTL ELSE 0 END )AS INPROGRESS,SUM(CASE WHEN STATUS IN ('WAITING','WAITING_CONCURRENT') THEN COUNTDTL ELSE 0  END ) AS WAITING, SUM(CASE WHEN STATUS IN ('COMPLETED','COMPLETED_CACHED','COMPLETED_CONCURRENT') THEN COUNTDTL ELSE 0 END )AS COMPLETED FROM(SELECT QUERY_LEVEL,STATUS, COUNT(*) COUNTDTL FROM  CISTHROTTLE GROUP BY QUERY_LEVEL,STATUS) GROUP BY QUERY_LEVEL  ORDER BY QUERY_LEVEL;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});
app.get("/datacubel2.json", (req, res, next) => {
  pooldatacube.query("SELECT DATABASE_NAME,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level2' GROUP BY DATABASE_NAME ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/datacubel3.json", (req, res, next) => {
  pooldatacube.query("SELECT DATABASE_NAME,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level3' GROUP BY DATABASE_NAME ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/datacubel21.json", (req, res, next) => {
  pooldatacube.query("SELECT TARGET,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level2' GROUP BY TARGET ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});

app.get("/datacubel31.json", (req, res, next) => {
  pooldatacube.query("SELECT TARGET,COUNT(*) FROM CISTHROTTLE WHERE STATUS='IN_PROGRESS' AND  QUERY_LEVEL='Level3' GROUP BY TARGET ORDER BY COUNT DESC;", function (err, response) {
      res.json(response.rows);
     // pool.end()
  });
});



app.use(express.static(__dirname+"/assets"));



app.use('/index', (req, res) => {
  res.render("index");
});


app.get("/posts/:userid",(req,res)=>
{
let val=req.params.userid;
if(val === "scanretail")
{
res.render("posting",{name:"Scan/Retail Lebanon",name1: "scanretaill2.json", name2: "scanretaill3.json",name3: "scanretaill21.json",name4: "scanretaill31.json" });
}
else if (val == "scancloud") {
  res.render("posting",{name:"Scan Cloud",name1: "scancloudl2.json", name2: "scancloudl3.json",name3: "scancloudl21.json",name4: "scancloudl31.json" });
}
else if (val == "panellebanon") {
  res.render("posting",{name:"Panel Lebanon",name1: "panell2.json", name2: "panell3.json",name3: "panell21.json",name4: "panell31.json" });

}
else if (val == "scanoldsmar") {
  res.render("posting",{name:"Scan Oldsmar",name1: "oldsmarl2.json", name2: "oldsmarl3.json",name3: "oldsmarl21.json",name4: "oldsmarl31.json" });

}
else if (val == "loyaltycloud") {
res.render("posting",{name:"Loyalty Cloud",name1: "ltycloudl2.json", name2: "ltycloudl3.json",name3: "ltycloudl21.json",name4: "ltycloudl31.json" });
}
else{
  res.render("posting",{name:"Datacube Lebanon",name1: "datacubel2.json", name2: "datacubel3.json",name3: "datacubel21.json",name4: "datacubel31.json" });

}



});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

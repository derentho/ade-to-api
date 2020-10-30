import express from "express";
import * as config from "./config.json";
import CourseArray from "./models/course_array";

const app = express();

app.get("/:rid", async (req, res) => {
  const rid = Number.parseInt(req.params.rid);
  const source = config.source.replace("{{ rid }}", `${rid}`);
  const data = await CourseArray.fromURL(source);
  res.json(data.orderByDate().json);
})

app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port}`);
});

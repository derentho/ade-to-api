import express from "express";
import CourseArray from "./models/course_array";

const PORT = process.env.PORT || 8080;
const SOURCE = "http://adecampus.univ-rouen.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources={{ rid }}&projectId=0&calType=ical&nbWeeks=52";

const app = express();

app.get("/:rid", async (req, res) => {
  const rid = Number.parseInt(req.params.rid);
  const source = SOURCE.replace("{{ rid }}", `${rid}`);
  const data = await CourseArray.fromURL(source);
  res.json(data.orderByDate().json);
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

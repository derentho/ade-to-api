import { fromURL, VEvent } from "node-ical";
import Course from "./course";

/**
 * Représente un ensemble de cours avec des opérations spécifiques tels que le
 *  tri et la limitation de résultat.
 */
export default class CourseArray {

    // --- Attribut ---

  #courses: Course[];


    // --- Constructeur ---

  constructor(courses: Course[]) {
    this.#courses = courses;
  }


    // --- Accesseur ---

  /**
   * La représentation `json` de l'ensemble de cours.
   */
  get json(): Course[] {
    return [ ...this.#courses ];
  }


    // --- Méthodes ---

  /**
   * Tri les éléments de l'ensemble suivant une fonction de comparaison.
   * 
   * @param comparator La fonction de comparaison sur l'ensemble des cours.
   */
  orderBy(comparator: (a: Course, b: Course) => number): CourseArray {
    const data = this.#courses.sort(comparator);
    return new CourseArray(data);
  }

  /**
   * Tri les éléments de l'ensemble du plus ancien au plus récent.
   */
  orderByDate(): CourseArray {
    return this.orderBy( (a, b) => a.start.getTime() - b.start.getTime() );
  }


    // --- Static ---

  /**
   * Récupère un ensemble de cours à partir d'une URL.
   * 
   * @param url L'URL d'un fichier `.ics`.
   */
  static async fromURL(url: string): Promise<CourseArray> {
    const courses = new Array<Course>();
    const data = await fromURL(url)
    for (const k in data) {
      const value = data[k] as VEvent;
      courses.push({
        summary: value.summary,
        start: value.start,
        end: value.end,
        location: value.location,
        description: value.description,
      });
    }
    return new CourseArray(courses);
  }

}

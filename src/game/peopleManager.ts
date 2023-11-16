import Building from "./building";
import Citizen from "./citizen";

class PeopleManager {
  private static instance: PeopleManager | null = null;
  people: Citizen[] = [];

  static getInstance() {
    if (!this.instance) {
      this.instance = new PeopleManager();
    }
    return this.instance;
  }

  public createPerson(house: Building): Citizen {
    const person = new Citizen(house);
    this.people.push(person);
    return person;
  }
}

export default PeopleManager.getInstance();

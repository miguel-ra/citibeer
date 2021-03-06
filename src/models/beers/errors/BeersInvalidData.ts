class BeersInvalidData extends Error {
  constructor() {
    super();
    this.name = "BeersInvalidData";
    this.message = "Invalid params";
  }
}

export default BeersInvalidData;

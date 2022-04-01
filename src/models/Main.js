class Main {
  constructor(client) {
    /**
     * The client that instantiated this
     * @readonly
     */
    Object.defineProperty(this, "client", { value: client });
  }

  _clone() {
    return Object.assign(Object.create(this), this);
  }

  _patch(data) {
    return data;
  }
}

module.exports = Main;

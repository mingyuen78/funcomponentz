let instance = null;

class CAPIHelper {
  // Using Singleton
  constructor() {
    if (!instance) {
      // Make sure is only one instance.
      instance = this;
    }

    this._type = "default";
    return instance;
  }

  debugValue(value) {
    console.log("CAPIHelper", value);
  }

  static googleSheetURL() {
    let returnValue = "";
    switch (instance._type) {
      case "default":
        returnValue =
          "https://script.google.com/macros/s/AKfycbyWx63L82e2DqT50ILpYL6rpGXakBaRteP-gzqdg-tnI1-xTEs/exec";
        break;

      case "phonecode":
        returnValue =
          "https://script.google.com/macros/s/AKfycbz6dsPaXOboi_ops9RaGAT1msjak4QTob1Blv8XR5ySxSrEmgVm/exec";
        break;

      case "population":
        returnValue =
          "https://script.google.com/macros/s/AKfycbyBWKD30pBQKSUpXYTJM37LQ1TAz36gMSBQIhWVwCzEp-TcdOCS/exec";
        break;

      default:
        returnValue =
          "https://script.google.com/macros/s/AKfycbyWx63L82e2DqT50ILpYL6rpGXakBaRteP-gzqdg-tnI1-xTEs/exec";
        break;
    }

    return returnValue;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }
}

export default CAPIHelper;

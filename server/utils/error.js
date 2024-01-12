class CustomErr extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode || 500;
    }
  }
  
  export default CustomErr;
import Status from "./status.interface";

const STATUS: { [name: string]: Status } = {
    DELETED: {
        "statusCode": 200,
        "message": "Deleted",
    },
    CREATED: {
        "statusCode": 201,
        "message": "Created",
    },
    OK: {
        "statusCode": 200,
        "message": "Ok",
    },
    UPDATED: {
      "statusCode": 200,
      "message": "Updated",
    }
}

export default STATUS;

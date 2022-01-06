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
    }
}

export default STATUS;

// class Status {
//     static DELETED = {
//         "statusCode": 200,
//         "message": "Deleted",
//     }
//     static CREATED = {
//         "statusCode": 201,
//         "message": "Created",
//     }
//     static OK = {
//         "statusCode": 200,
//         "message": "Ok",
//     }
// }
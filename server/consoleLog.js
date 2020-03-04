
const Colors = {Alert: "\x1b[31m%s\x1b[0m", 
                Notice: "\x1b[0m\x1b[33m%s\x1b[0m", 
                Message: "\x1b[1m\x1b[30m%s\x1b[0m",
                Success: "\x1b[32m%s\x1b[0m"};
                
exports.Messagetype = {alert: "alert", notice: "notice", message: "message", Success: "success"};

exports.ServerLog = function(message="", severity=""){
    switch(severity.toLowerCase()){
        case "alert":
            console.warn(Colors.Alert, "ALERT: " + message);
        break;
        case "notice":
            console.log(Colors.Notice, "NOTICE: " + message);
        break;
        case "message":
            console.log(Colors.message, message);
        break;
        case "success":
            console.log(Colors.Success, message);
    }
}
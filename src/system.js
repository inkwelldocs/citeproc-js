/*global CSL: true */

CSL.setupXml = function(xmlObject) {
    var dataObj = {};
    var parser = null;
    if ("undefined" !== typeof xmlObject) {
        if ("string" === typeof xmlObject) {
            xmlObject = xmlObject.replace("^\uFEFF", "")
                .replace(/^\s+/, "");
            if (xmlObject.slice(0, 1) === "<") {
                // Assume serialized XML
                dataObj = CSL.parseXml(xmlObject);
            } else {
                // Assume serialized JSON
                dataObj = JSON.parse(xmlObject);
            }
            parser = new CSL.XmlJSON(dataObj);
        } else if ("undefined" !== typeof xmlObject.getAttribute) {
            // Assume DOM instance
            throw new Error('xmldom is not supported');
        } else if ("undefined" !== typeof xmlObject.toXMLString) {
            // Assume E4X object
            throw new Error('E4X is not supported');
        } else {
            // Assume JS object
            parser = new CSL.XmlJSON(xmlObject);
        }
    } else {
        print("OUCH!");
    }
    if (!parser) {
        throw "citeproc-js error: unable to parse style or locale object";
    }
    return parser;
}

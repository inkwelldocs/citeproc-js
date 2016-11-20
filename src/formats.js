/*global CSL: true */

/**
 * Output specifications.
 * @class
 */
CSL.Output.Formats = function () {};

/**
 * Trim a comma from JSON.
 */
CSL.trimComma = function(str) {
    return str.replace(/, $/, '');
}

/**
 * Nest a string a JSON.
 */
CSL.nestString = function(key, str) {
    return '{"' + key + '": [' + CSL.trimComma(str) + ']}, ';
}

/**
 * Nest a string a JSON.
 */
CSL.nestKeyValueString = function(key, value, str) {
    return '{"' + key + '": "' + value + '", "content": [' + CSL.trimComma(str) + ']}, ';
}

/**
 * JSON output specification, specific to Inkwell.
 */
CSL.Output.Formats.prototype.json = {
    "text_escape": function (text) {
        if (!text) {
            text = '';
        }
        var escaped = text.replace(/"/g, '\\"')
            .replace(/\r/g, "\\r")
            .replace(/\n/g, "\\n")
            // .replace(CSL.SUPERSCRIPTS_REGEXP,
            //     function(aChar) {
            //         return "<sup>" + CSL.SUPERSCRIPTS[aChar] + "</sup>"; // fixme
            //     });
        if (escaped == '') {
            return '';
        } else {
            return '"' + escaped + '", ';
        }
    },
    "bibstart": "{",
    "bibend": "}",
    "@font-style/italic": function (state, str) {
        return CSL.nestKeyValueString('font-style', 'italic', str);
    },
    "@font-style/oblique": function (state, str) {
        return CSL.nestKeyValueString('font-style', 'oblique', str);
    },
    "@font-style/normal": function (state, str) {
        return CSL.nestKeyValueString('font-style', 'normal', str);
    },
    "@font-variant/small-caps": function (state, str) {
        return CSL.nestKeyValueString('font-variant', 'small-caps', str);
    },
    "@passthrough/true": CSL.Output.Formatters.passthrough,
    "@font-variant/normal": function (state, str) {
        return CSL.nestKeyValueString('font-variant', 'normal', str);
    },
    "@font-weight/bold": function (state, str) {
        return CSL.nestKeyValueString('font-weight', 'bold', str);
    },
    "@font-weight/normal": function (state, str) {
        return CSL.nestKeyValueString('font-weight', 'normal', str);
    },
    "@font-weight/light": false,
    "@text-decoration/none": function (state, str) {
        return CSL.nestKeyValueString('text-decoration', 'none', str);
    },
    "@text-decoration/underline": function (state, str) {
        return CSL.nestKeyValueString('text-decoration', 'underline', str);
    },
    "@vertical-align/sup": function (state, str) {
        return CSL.nestKeyValueString('vertical-align', 'sup', str);
    },
    "@vertical-align/sub": function (state, str) {
        return CSL.nestKeyValueString('vertical-align', 'sub', str);
    },
    "@vertical-align/baseline": function (state, str) {
        return CSL.nestKeyValueString('vertical-align', 'baseline', str);
    },
    "@strip-periods/true": CSL.Output.Formatters.passthrough,
    "@strip-periods/false": CSL.Output.Formatters.passthrough,
    "@quotes/true": function (state, str) {
        if ("undefined" === typeof str) {
            return '"' + state.getTerm("open-quote") + '", ';
        }
        return '"' + state.getTerm("open-quote") + '", ' + str + '"' + state.getTerm("close-quote") + '", ';
    },
    "@quotes/inner": function (state, str) {
        if ("undefined" === typeof str) {
            return '"\u2019", '; // RIGHT SINGLE QUOTATION MARK
        }
        return '"' + state.getTerm("open-inner-quote") + '", ' + str + '"' + state.getTerm("close-inner-quote") + '", ';
    },
    "@quotes/false": false,
    "@cite/entry": function (state, str) {
        return str;
    },
    "@bibliography/entry": function (state, str) {
        return str;
    },
    "@display/block": function (state, str) {
        return CSL.nestKeyValueString('display', 'block', str);
    },
    "@display/left-margin": function (state, str) {
        return CSL.nestKeyValueString('display', 'left-margin', str);
    },
    "@display/right-inline": function (state, str) {
        return CSL.nestKeyValueString('display', 'right-inline', str);
    },
    "@display/indent": function (state, str) {
        return CSL.nestKeyValueString('display', 'indent', str);
    },
    "@showid/true": function (state, str, cslid) {
        if (!state.tmp.just_looking && ! state.tmp.suppress_decorations) {
            if (cslid) {
                return "<span class=\"" + state.opt.nodenames[cslid] + "\" cslid=\"" + cslid + "\">" + str + "</span>"; // not used in production
            } else if (this.params && "string" === typeof str) {
                var prePunct = "";
                if (str) {
                    var m = str.match(CSL.VARIABLE_WRAPPER_PREPUNCT_REX);
                    prePunct = m[1];
                    str = m[2];
                }
                var postPunct = "";
                if (str && CSL.SWAPPING_PUNCTUATION.indexOf(str.slice(-1)) > -1) {
                    postPunct = str.slice(-1);
                    str = str.slice(0,-1);
                }
                return state.sys.variableWrapper(this.params, prePunct, str, postPunct);
            } else {
                return '@showid' + str;
            }
        } else {
            return '@showid' + str;
        }
    },
    "@URL/true": function (state, str) {
        return CSL.nestString('url', str);
    },
    "@DOI/true": function (state, str) {
        return CSL.nestString('doi', str);
    }
};

CSL.Output.Formats = new CSL.Output.Formats();

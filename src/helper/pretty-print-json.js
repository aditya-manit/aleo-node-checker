import './css/style-json.css';

export async function jsonToHtml(json) {
    if (typeof json === 'string') {
        try {
            json = JSON.parse(json);
        } catch (e) {
            return '<span class="json-string">' + json + '</span>';
        }
    }

    const traverse = (obj, isKey) => {
        let output = '';
        if (typeof obj === 'object' && obj !== null) {
            const isArray = Array.isArray(obj);
            output += '<span class="json-punctuation">' + (isArray ? '[' : '{') + '</span><br>';
            const keys = Object.keys(obj);
            keys.forEach((key, index) => {
                output += '<div style="margin-left: 20px;">';
                if (!isArray) {
                    output += '<span class="json-key">"' + key + '":</span> ';
                }
                output += traverse(obj[key], !isArray) + (index < keys.length - 1 ? ',' : '') + '<br>';
                output += '</div>';
            });
            output += '<span class="json-punctuation">' + (isArray ? ']' : '}') + '</span>';
        } else if (typeof obj === 'string') {
            output += '<span class="json-string">"' + obj + '"</span>';
        } else {
            output += '<span class="json-value">' + obj + '</span>';
        }
        return output;
    };

    return traverse(json);
}

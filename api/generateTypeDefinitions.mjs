import { readFileSync, writeFileSync } from 'node:fs';

const data = readFileSync(process.argv[2], 'utf8');
const json = JSON.parse(data);
const schemas = json.components.schemas;

var file = "";

for (const schemaName in schemas) {
    const schema = schemas[schemaName];
    if (schema.type != "object") throw Error(`Unknow type: ${schema.type}`);

    file += `interface ${schemaName} {\n`

    for (const propertyName in schema.properties) {
        const property = schema.properties[propertyName];
        const required = schema.required.includes(propertyName);
        
        file += `    ${propertyName}${required ? "" : "?"}: `;

        if (property.type == "array") {
            const typeParts = property.items["$ref"].split("/");
            const typeName = typeParts[typeParts.length - 1];
            file += `${typeName}[];\n`;

        } else if (property.type == "string") {
            if (property.enum) {
                file += property.enum.map(value => `"${value}"`).join(" | ");
                file += ";\n";
            } else {
                file += `${property.type};\n`;
            }
        } else {
            file += `${property.type};\n`;
        }
    }

    file += "}\n\n"
}

writeFileSync(process.argv[3], file);

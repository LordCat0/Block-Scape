const numberShadow = (inputId, defaultValue) => {return `<value name="${inputId}"><shadow type="math_number"><field name="NUM">${defaultValue}</field></shadow></value>`}
const stringShadow = (inputId, defaultValue) => {return `<value name="${inputId}"><shadow type="inline_string_shadow"><field name="TEXT">${defaultValue}</field></shadow></value>`}


export const toolboxColors = {
    Events: "#e3ab32",
    Logic: "#e4ba2e",
    Math: "#16ad19",
    Strings: "#00b963",
    Json: "#345fc4",
    Objects: "#bc47b4"
}

const keys = [
      ["A", "a"], ["B", "b"], ["C", "c"], ["D", "d"], ["E", "e"],
      ["F", "f"], ["G", "g"], ["H", "h"], ["I", "i"], ["J", "j"],
      ["K", "k"], ["L", "l"], ["M", "m"], ["N", "n"], ["O", "o"],
      ["P", "p"], ["Q", "q"], ["R", "r"], ["S", "s"], ["T", "t"],
      ["U", "u"], ["V", "v"], ["W", "w"], ["X", "x"], ["Y", "y"],
      ["Z", "z"],

      ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"],
      ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"],

      ["Arrow Up", "ArrowUp"], ["Arrow Down", "ArrowDown"],
      ["Arrow Left", "ArrowLeft"], ["Arrow Right", "ArrowRight"],

      ["Enter", "Enter"], ["Escape", "Escape"], ["Backspace", "Backspace"],
      ["Tab", "Tab"], ["Caps Lock", "CapsLock"], ["Shift", "Shift"],
      ["Control", "Control"], ["Alt", "Alt"], ["Meta (Cmd/Win)", "Meta"],

      ["Space", " "], ["Page Up", "PageUp"], ["Page Down", "PageDown"],
      ["End", "End"], ["Home", "Home"], ["Insert", "Insert"], ["Delete", "Delete"],

      ["F1", "F1"], ["F2", "F2"], ["F3", "F3"], ["F4", "F4"],
      ["F5", "F5"], ["F6", "F6"], ["F7", "F7"], ["F8", "F8"],
      ["F9", "F9"], ["F10", "F10"], ["F11", "F11"], ["F12", "F12"],

      [";", ";"], ["=", "="], [",", ","], ["-", "-"],
      [".", "."], ["/", "/"], ["`", "`"], ["[", "["],
      ["\\", "\\"], ["]", "]"], ["'", "'"]
    ]

export function clientToolbox(){
    return `<xml id="toolbox" style="display: none">
        <category name="Events" colour="${toolboxColors.Events}">
          <label text="Events"></label>
          <block type="events_whenstarted"></block>
          <block type="events_whenstopped"></block>
          <block type="events_whenkeypressed" gap="50"></block>
          <button text="Create event" callbackKey="createGameEvent"></button>
          <block type="events_whenreceivedevent"></block>
          <block type="events_callevent"></block>
        </category>
          <category name="Logic" colour="${toolboxColors.Logic}">
          <label text="Logic"></label>
          <block type="logic_wait">
            ${numberShadow('SECONDS', 10)}
          </block>
          <block type="logic_repeat">
            ${numberShadow('REPEAT', 10)}
          </block>
          <block type="logic_forever"></block>
          <block type="logic_if"></block>
          <block type="logic_ifelse"></block>
          <block type="logic_ifelsestring">
            ${stringShadow('VALUE1', 'apple')}
            ${stringShadow('VALUE2', 'banana')}
          </block>
          <block type="logic_waituntil"></block>
          <block type="logic_while"></block>
          <block type="logic_stop"></block>
        </category>
        <category name="Math" colour="${toolboxColors.Math}">
          <label text="Math"></label>
          <block type="math_add">
            ${numberShadow('NUM1', 0)}
            ${numberShadow('NUM2', 0)}
          </block>
          <block type="math_subtract">
            ${numberShadow('NUM1', 0)}
            ${numberShadow('NUM2', 0)}
          </block>
          <block type="math_multiply">
            ${numberShadow('NUM1', 0)}
            ${numberShadow('NUM2', 0)}
          </block>
          <block type="math_divide" gap="50">
            ${numberShadow('NUM1', 0)}
            ${numberShadow('NUM2', 0)}
          </block>
          <block type="math_comparison">
            ${stringShadow('VALUE1', 50)}
            ${stringShadow('VALUE2', 25)}
          </block>
          <block type="math_boolcomparison"></block>
          <block type="math_randomnum">
            ${numberShadow('MIN', 0)}
            ${numberShadow('MAX', 10)}
          </block>
          <block type="math_mathop">
            ${numberShadow('NUM', 10)}
          </block>
        </category>
        <category name="Strings" colour="${toolboxColors.Strings}">
          <label text="Strings"></label>
          <block type="strings_newline"></block>
          <block type="strings_letterof">
            ${numberShadow('LETTER', 1)}
            ${stringShadow('STRING', "apple")}
          </block>
          <block type="strings_letterrange">
            ${numberShadow('START', 1)}
            ${numberShadow('END', 3)}
            ${stringShadow('STRING', "apple")}
          </block>
          <block type="strings_split">
            ${stringShadow('STRING', "Hello, world!")}
            ${stringShadow('SPLIT', ', ')}
            ${numberShadow('ITEM', 1)}
          </block>
          <block type="strings_replace">
            ${stringShadow('TARGET', "morning")}
            ${stringShadow('REPLACE', 'afternoon')}
            ${stringShadow('STRING', "Good morning!")}
          </block>
          <block type="strings_join">
            ${stringShadow('STRING1', 'apple')}
            ${stringShadow('STRING2', 'banana')}
          </block>
          <block type="strings_reverse">
            ${stringShadow('STRING', "apple")}
          </block>
          <block type="strings_length" gap="50">
            ${stringShadow('STRING', "apple")}
          </block>
        </category>
        <category name="Json" colour="${toolboxColors.Json}">
          <label text="Json"></label>
          <block type="json_validate">${stringShadow('STRING', '{"Hello": "World"}')}</block>
          <block type="json_objectall"><value name="JSON"></value></block>
          <block type="json_parse">${stringShadow('STRING', '{"apple": "banana"}')}</block>
          <block type="json_stringify"></block>
          <block type="json_new"></block>
          <label text="Objects"></label>
          <block type="json_objectlen"></block>
          <block type="json_objectvalue">${stringShadow('KEY', 'key')}</block>
          <block type="json_setobjectvalue">
            ${stringShadow('KEY', 'key')}
            ${stringShadow('VALUE', 'value')}
          </block>
          <block type="json_delobjectvalue">${stringShadow('KEY', 'key')}</block>
          <label text="Arrays"></label>
          <block type="json_arraylen"></block>
          <block type="json_arrayitem">${numberShadow('ITEM', 1)}</block>
          <block type="json_arraydelete">${numberShadow('ITEM', 1)}</block>
          <block type="json_arrayindex">${stringShadow('ITEM', 'value')}</block>
          <block type="json_arrayadd">${stringShadow('ITEM', 'value')}</block>
          <block type="json_arrayreplace">
            ${numberShadow('ITEM', '1')}
            ${stringShadow('REPLACEMENT', 'apple')}
          </block>
          <block type="json_arrayinsert">
            ${stringShadow('VALUE', 'apple')}
            ${numberShadow('ITEM', 1)}
          </block>
          <label text="Extra"></label>
          <block type="json_splittoarray">
            ${stringShadow('STRING', 'apple')}
            ${stringShadow('SPLIT', 'p')}
          </block>
          <block type="json_joinarray">${stringShadow('JOIN', ",")}</block>
        </category>
        <category name="Objects" colour="${toolboxColors.Objects}">
          <label text="Objects"></label>
          <button text="How to select game objects" callbackKey="openObjectSelectingDocs"></button>
          <block type="objects_new"></block>
          <block type="objects_select" gap="50">${stringShadow('SELECTOR', 'project/block')}</block>
          <block type="objects_setattribute">
            ${stringShadow('ATTRIBUTE', 'name')}
            ${stringShadow('VALUE', 'My object')}
          </block>
          <block type="objects_getattribute">${stringShadow('ATTRIBUTE', 'name')}</block>
          <block type="objects_getattributejson" gap="50"></block>
          <block type="objects_append"></block>
          <block type="objects_delete"></block>
        </category>
        </xml>
    `
}

export function clientBlockDefinitions(){
    return [{
      type: "events_whenstarted",
      message0: "When game started %1",
      args0: [{
        type: "field_image",
        src: "./assets/blockIcons/play.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      hat: "cap",
      nextStatement: null,
      colour: toolboxColors.Events
    },{
      type: "events_whenstopped",
      message0: "when game stopped %1",
      args0: [{
        type: "field_image",
        src: "./assets/blockIcons/stop-sign.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      hat: "cap",
      nextStatement: null,
      colour: toolboxColors.Events
    },{
      type: "events_whenkeypressed",
      message0: "when key %1 pressed %2",
      args0: [{
        type: "field_dropdown",
        name: "KEY",
        options: keys
      },{
        type: "field_image",
        src: "./assets/blockIcons/keyboard.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      colour: toolboxColors.Events,
      hat: "cap",
      nextStatement: null
    },{
      type: "events_whenreceivedevent",
      message0: "when event %1 called %2",
      args0: [{
        type: "field_dropdown",
        name: "EVENT",
        options: [["TODO: add events", "TODO"]]
      },{
        type: "field_image",
        src: "./assets/blockIcons/satellite.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      hat: "cap",
      nextStatement: null,
      colour: toolboxColors.Events
    },{
      type: "events_callevent",
      message0: "call event %1 %2",
      args0: [{
        type: "field_dropdown",
        name: "EVENT",
        options: [["TODO: add events", "TODO"]]
      },{
        type: "field_image",
        src: "./assets/blockIcons/satellite.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      nextStatement: null,
      previousStatement: null,
      colour: toolboxColors.Events
    },{
      type: "logic_wait",
      message0: "wait %1 seconds",
      args0: [{
        type: "input_value",
        name: "SECONDS",
        check: ["Number", "String"]
      }],
      nextStatement: null,
      previousStatement: null,
      colour: toolboxColors.Logic
    },{
      type: "logic_repeat",
      message0: "repeat %1 times\n%2",
      args0: [{
        type: "input_value",
        name: "REPEAT"
      },{
        type: "input_statement",
        name: "STATEMENT"
      }],
      previousStatement: null,
      nextStatement: null,
      colour: toolboxColors.Logic,
    },{
      type: "logic_forever",
      message0: "forever\n%1",
      args0: [{
        type: "input_statement",
        name: "STATEMENT"
      }],
      colour: toolboxColors.Logic,
      previousStatement: null
    },{
      type: "logic_if",
      message0: "if %1 then %2",
      args0: [{
        type: "input_value",
        name: "CONDITION",
        check: "Boolean"
      },{
        type: "input_statement",
        name: "STATEMENT"
      }],
      nextStatement: null,
      previousStatement: null,
      colour: toolboxColors.Logic
    },{
      type: "logic_ifelse",
      message0: "if %1 then %2 else %3",
      args0: [{
        type: "input_value",
        name: "CONDITION",
        check: "Boolean"
      },{
        type: "input_statement",
        name: "STATEMENT1"
      },{
        type: "input_statement",
        name: "STATEMENT2"
      }],
      nextStatement: null,
      previousStatement: null,
      colour: toolboxColors.Logic
    },{
      type: "logic_ifelsestring",
      message0: "if %1 then %2 else %3",
      args0: [{
        type: "input_value",
        name: "CONDITION",
        check: "Boolean"
      },{
        type: "input_value",
        name: "VALUE1"
      },{
        type: "input_value",
        name: "VALUE2"
      }],
      inputsInline: true,
      output: "String",
      colour: toolboxColors.Logic
    },{
      type: "logic_waituntil",
      message0: "wait until %1",
      args0: [{
        type: "input_value",
        name: "CONDITION",
        check: "Boolean"
      }],
      previousStatement: null,
      nextStatement: null,
      colour: toolboxColors.Logic
    },{
      type: "logic_while",
      message0: "while %1 do \n%2",
      args0: [{
        type: "input_value",
        name: "CONDITION",
        check: "Boolean"
      },{
        type: "input_statement",
        name: "STATEMENT"
      }],
      nextStatement: null,
      previousStatement: null,
      colour: toolboxColors.Logic
    },{
      type: "logic_stop",
      message0: "stop %1",
      args0: [{
        type: "field_dropdown",
        name: "STOP",
        options: [
          ["Game", "GAME"],
          ["This thread", "THREAD"],
          ["All threads in script", "THISSCRIPT"],
          ["All scripts in object", "ALLSCRIPTS"]
        ]
      }],
      previousStatement: null,
      colour: toolboxColors.Logic
    },{
      type: "math_add",
      message0: "%1+%2",
      args0: [{
        type: "input_value",
        name: "NUM1",
        check: ["Number", "String"]
      },{
        type: "input_value",
        name: "NUM2",
        check: ["Number", "String"]
      }],
      output: "Number",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_subtract",
      message0: "%1-%2",
      args0: [{
        type: "input_value",
        name: "NUM1",
        check: ["Number", "String"]
      },{
        type: "input_value",
        name: "NUM2",
        check: ["Number", "String"]
      }],
      output: "Number",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_multiply",
      message0: "%1*%2",
      args0: [{
        type: "input_value",
        name: "NUM1",
        check: ["Number", "String"]
      },{
        type: "input_value",
        name: "NUM2",
        check: ["Number", "String"]
      }],
      output: "Number",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_divide",
      message0: "%1/%2",
      args0: [{
        type: "input_value",
        name: "NUM1",
        check: ["Number", "String"]
      },{
        type: "input_value",
        name: "NUM2",
        check: ["Number", "String"]
      }],
      output: "Number",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_comparison",
      message0: "%1%2%3",
      args0: [{
        type: "input_value",
        name: "VALUE1"
      },{
        type: "field_dropdown",
        name: "COMPARISON",
        options: [
          ["=", "EQUALS"],
          ["≠", "NOTEQUALS"],
          [">", "GREATERTHAN"],
          ["<", "LESSTHAN"],
          ["≥", "GREATERTHANOREQUAL"],
          ["≤", "LESSTHANOREQUAL"]
        ]
      },{
        type: "input_value",
        name: "VALUE2"
      }],
      output: "Boolean",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_randomnum",
      message0: "random number from %1 to %2",
      args0: [{
        type: "input_value",
        name: "MIN"
      },{
        type: "input_value",
        name: "MAX"
      }],
      output: "Number",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_mathop",
      message0: "%1 of %2",
      args0: [{
        type: "field_dropdown",
        name: "OPERATION",
        options: [
          ["abs", "ABS"],
          ["floor", "FLOOR"],
          ["ceiling", "CEILING"],
          ["sqrt", "SQRT"],
          ["sin", "SIN"],
          ["cos", "COS"],
          ["tan", "TAN"],
          ["asin", "ASIN"],
          ["acos", "ACOS"],
          ["atan", "ATAN"],
          ["In", "IN"],
          ["log", "LOG"],
          ["e ^", "POWERE"],
          ["10 ^", "POWER10"]
        ]
      },{
        type: "input_value",
        name: "NUM"
      }],
      output: "Number",
      colour: toolboxColors.Math
    },{
      type: "strings_newline",
      message0: "newline character",
      output: "String",
      colour: toolboxColors.Strings
    },{
      type: "strings_join",
      message0: "join %1%2",
      args0: [{
        type: "input_value",
        name: "STRING1"
      },{
        type: "input_value",
        name: "STRING2"
      }],
      output: "String",
      colour: toolboxColors.Strings,
      inputsInline: true
    },{
      type: "strings_letterof",
      message0: "letter %1 of %2",
      args0: [{
        type: "input_value",
        name: "LETTER"
      },{
        type: "input_value",
        name: "STRING"
      }],
      output: "String",
      colour: toolboxColors.Strings,
      inputsInline: true
    },{
        type: "strings_split",
        message0: "split %1 by %2 and get item %3",
        args0: [{
            type: "input_value",
            name: "STRING"
        },{
            type: "input_value",
            name: "SPLIT"
        },{
            type: "input_value",
            name: "ITEM"
        }],
        output: "String",
        colour: toolboxColors.Strings,
        inputsInline: true
    },{
        type: "strings_replace",
        message0: "replace all %1 with %2 in %3",
        args0: [{
            type: "input_value",
            name: "TARGET"
        },{
            type: "input_value",
            name: "REPLACE"
        },{
            type: "input_value",
            name: "STRING"
        }],
        output: "String",
        colour: toolboxColors.Strings,
        inputsInline: true
    },{
      type: "strings_letterrange",
      message0: "letters %1 to %2 in %3",
      args0: [{
        type: "input_value",
        name: "START"
      },{
        type: "input_value",
        name: "END"
      },{
        type: "input_value",
        name: "STRING"
      }],
      output: "String",
      colour: toolboxColors.Strings,
      inputsInline: true
    },{
      type: "strings_reverse",
      message0: "reverse %1",
      args0: [{
        type: "input_value",
        name: "STRING"
      }],
      output: "String",
      inputsInline: true,
      colour: toolboxColors.Strings
    },{
      type: "strings_length",
      message0: "length of %1",
      args0: [{
        type: "input_value",
        name: "STRING"
      }],
      output: "Number",
      colour: toolboxColors.Strings,
      inputsInline: true
    },{
      type: "json_new",
      message0: "new %1",
      args0: [{
        type: "field_dropdown",
        name: "TYPE",
        options: [['Object', 'OBJECT'],['Array', 'ARRAY']]
      }],
      output: 'Json',
      colour: toolboxColors.Json
    },{
      type: "json_validate",
      message0: "is %1 valid %2",
      args0: [{
        type: "input_value",
        name: "STRING"
      },{
        type: "field_dropdown",
        name: "TYPE",
        options: [
          ["Json", "JSON"],
          ["Object", "OBJECT"],
          ["Array", "ARRAY"]
        ]
      }],
      output: "Boolean",
      colour: toolboxColors.Json
    },{
      type: "json_objectall",
      message0: "all %1 of object %2",
      args0: [{
        type: "field_dropdown",
        name: "TYPE",
        options: [['Keys', 'KEYS'],['Values', 'VALUES']]
      },{
        type: "input_value",
        name: "JSON",
        check: "Json"
      }],
      output: "Json",
      colour: toolboxColors.Json
    },{
      type: "json_parse",
      message0: "parse %1",
      args0: [{
        type: "input_value",
        name: "STRING"
      }],
      output: "Json",
      colour: toolboxColors.Json
    },{
      type: "json_stringify",
      message0: "stringify %1",
      args0: [{
        type: "input_value",
        name: "JSON",
        check: "Json"
      }],
      output: "String",
      colour: toolboxColors.Json
    },{
      type: "json_objectlen",
      message0: "length of object %1",
      args0: [{
        type: "input_value",
        name: "OBJECT",
        check: "Json"
      }],
      colour: toolboxColors.Json,
      output: "Number"
    },{
      type: "json_objectvalue",
      message0: "value of %1 in %2",
      args0: [{
        type: "input_value",
        name: "KEY"
      },{
        type: "input_value",
        name: "JSON",
        check: "Json"
      }],
      inputsInline: true,
      colour: toolboxColors.Json,
      output: "String"
    },{
      type: "json_setobjectvalue",
      message0: "set %1 to %2 in %3",
      args0: [{
        type: "input_value",
        name: "KEY"
      },{
        type: "input_value",
        name: "VALUE"
      },{
        type: "input_value",
        name: "JSON",
        check: "Json"
      }],
      colour: toolboxColors.Json,
      output: "Json",
      inputsInline: true
    },{
      type: "json_delobjectvalue",
      message0: "delete %1 in %2",
      args0: [{
        type: "input_value",
        name: "KEY"
      },{
        type: "input_value",
        name: "JSON",
        check: "Json"
      }],
      colour: toolboxColors.Json,
      output: "Json",
      inputsInline: true
    },{
      type: "json_arraylen",
      message0: "length of array %1",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "Json"
      }],
      colour: toolboxColors.Json,
      output: "Number"
    },{
      type: "json_arrayitem",
      message0: "item %1 of array %2",
      args0: [{
        type: "input_value",
        name: "ITEM",
      },{
        type: "input_value",
        name: "ARRAY",
        check: "Json"
      }],
      colour: toolboxColors.Json,
      inputsInline: true,
      output: "String"
    },{
      type: "json_arrayadd",
      message0: "add %1 to array %2",
      args0: [{
        type: "input_value",
        name: "ITEM"
      },{
        type: "input_value",
        name: "ARRAY",
        check: "Json"
      }],
      colour: toolboxColors.Json,
      output: "Json",
      inputsInline: true
    },{
      type: "json_arraydelete",
      message0: "delete item %1 from array %2",
      args0: [{
        type: "input_value",
        name: "ITEM",
        check: ["Number", "String"]
      },{
        type: "input_value",
        name: "ARRAY",
        check: "Json"
      }],
      output: "Json",
      colour: toolboxColors.Json,
      inputsInline: true
    },{
      type: "json_arrayreplace",
      message0: "replace item %1 of array %2 with %3",
      args0: [{
        type: "input_value",
        name: "ITEM"
      },{
        type: "input_value",
        name: "ARRAY",
        check: "Json"
      },{
        type: "input_value",
        name: "REPLACEMENT"
      }],
      colour: toolboxColors.Json,
      output: "Json",
      inputsInline: true
    },{
      type: "json_arrayinsert",
      message0: "insert %1 at %2 of array %3",
      args0: [{
        type: "input_value",
        name: "VALUE",
      },{
        type: "input_value",
        name: "ITEM",
      },{
        type: "input_value",
        name: "ARRAY",
        check: "Json"
      }],
      colour: toolboxColors.Json,
      output: "Json",
      inputsInline: true
    },{
      type: "json_arrayindex",
      message0: "index of %1 in array %2",
      args0: [{
        type: "input_value",
        name: "ITEM"
      },{
        type: "input_value",
        name: "ARRAY",
        check: "Json"
      }],
      colour: toolboxColors.Json,
      output: "String",
      inputsInline: true
    },{
      type: "json_splittoarray",
      message0: "split %1 by %2 to array",
      args0: [{
        type: "input_value",
        name: "STRING",
        check: ["String", "Number"]
      },{
        type: "input_value",
        name: "SPLIT",
        check: ["String", "Number"]
      }],
      colour: toolboxColors.Json,
      output: "Json",
      inputsInline: true
    },{
      type: "json_joinarray",
      message0: "join array %1 by %2",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "Json"
      },{
        type: "input_value",
        name: "JOIN",
        check: ["String", "Number"]
      }],
      colour: toolboxColors.Json,
      output: "String",
      inputsInline: true
    },{
      type: "objects_new",
      message0: "new object %1",
      args0: [{
        type: "field_dropdown",
        name: "TYPE",
        options: [["TODO: add object types", "TODO"]]
      }],
      colour: toolboxColors.Objects,
      output: "Object"
    },{
      type: "objects_select",
      message0: "select object %1",
      args0: [{
        type: "input_value",
        name: "SELECTOR"
      }],
      colour: toolboxColors.Objects,
      output: "Object",
      inputsInline: true
    },{
      type: "objects_setattribute",
      message0: "set attribute %1 to %2 in %3",
      args0: [{
        type: 'input_value',
        name: "ATTRIBUTE"
      },{
        type: 'input_value',
        name: "VALUE"
      },{
        type: "input_value",
        name: "OBJECT",
        check: "Object"
      }],
      colour: toolboxColors.Objects,
      inputsInline: true,
      previousStatement: null,
      nextStatement: null
    },{
      type: "objects_getattribute",
      message0: "get attribute %1 from %2",
      args0: [{
        type: 'input_value',
        name: "ATTRIBUTE"
      },{
        type: 'input_value',
        name: "OBJECT",
        check: "Object"
      }],
      colour: toolboxColors.Objects,
      output: "String",
      inputsInline: true
    },{
      type: "objects_getattributejson",
      message0: "get attribute json from %1",
      args0: [{
        type: "input_value",
        name: "OBJECT",
        check: "Object"
      }],
      output: "Json",
      colour: toolboxColors.Objects
    },{
      type: "objects_append",
      message0: "append %1 to %2",
      args0: [{
        type: 'input_value',
        name: "OBJECT",
        check: "Object"
      },{
        type: 'input_value',
        name: "APPEND",
        check: "Object"
      }],
      colour: toolboxColors.Objects,
      nextStatement: null,
      previousStatement: null,
      inputsInline: true
    },{
      type: "objects_delete",
      message0: "delete %1",
      args0: [{
        type: "input_value",
        name: "OBJECT",
        check: "Object"
      }],
      colour: toolboxColors.Objects,
      nextStatement: null,
      previousStatement: null
    }]
}

export function serverToolbox(){
    return ``
}

export function serverBlockDefinitions(){
    return []
}
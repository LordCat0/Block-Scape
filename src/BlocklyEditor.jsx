import {useRef, useEffect} from 'react'

import * as Blockly from 'blockly/core';
import DarkTheme from '@blockly/theme-dark'
import * as libraryBlocks from 'blockly/blocks';
import {javascriptGenerator} from 'blockly/javascript';
import * as En from 'blockly/msg/en';
import './Blockly.css'

/*
BLOCK CATEGORYS

events
control
math
...finsih

*/


export default function BlocklyEditor({ readonly, game3d }) {
  const blocklyRef = useRef(null)
  const workspaceRef = useRef(null)

  useEffect(() => {
    Blockly.setLocale(En)
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
    const toolboxColors = {
      Events: "#e3ab32",
      Logic: "#e4ba2e",
      Math: "#16ad19",
      Strings: "#00b963"
    }
    const numberShadow = (inputId, defaultValue) => {return `<value name="${inputId}"><shadow type="math_number"><field name="NUM">${defaultValue}</field></shadow></value>`}
    const stringShadow = (inputId, defaultValue) => {return `<value name="${inputId}"><shadow type="inline_string_shadow"><field name="TEXT">${defaultValue}</field></shadow></value>`}
    const toolbox = `<xml id="toolbox" style="display: none">
    <category name="Events" colour="${toolboxColors.Events}">
      <block type="events_whenstarted"></block>
      <block type="events_whenstopped"></block>
      <block type="events_whenkeypressed" gap="50"></block>
      <button text="Create event" callbackKey="createGameEvent"></button>
      <block type="events_whenreceivedevent"></block>
      <block type="events_callevent"></block>
    </category>
        <label text="Events"></label>
      <category name="Logic" colour="${toolboxColors.Logic}">
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
    </xml>
`
    Blockly.common.defineBlocksWithJsonArray([{
      type: "events_whenstarted",
      message0: "When game started %1",
      args0: [{
        type: "field_image",
        src: "./assets/play.svg",
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
        src: "./assets/stop-sign.svg",
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
        src: "./assets/keyboard.svg",
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
        src: "./assets/satellite.svg",
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
        src: "./assets/satellite.svg",
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
        check: "Number"
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
          ["This block stack", "BLOCKSTACK"],
          ["All block stacks in script", "THISSCRIPT"],
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
        check: "Number"
      },{
        type: "input_value",
        name: "NUM2",
        check: "Number"
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
        check: "Number"
      },{
        type: "input_value",
        name: "NUM2",
        check: "Number"
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
        check: "Number"
      },{
        type: "input_value",
        name: "NUM2",
        check: "Number"
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
        check: "Number"
      },{
        type: "input_value",
        name: "NUM2",
        check: "Number"
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
    }])
    Blockly.Blocks['inline_string_shadow'] = {
      init: function() {
        this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput(""), "TEXT");
        this.setOutput(true, "String");
        this.setColour(160);
      }
    };
    Blockly.Blocks['math_boolcomparison'] = {
      init: function () {
        this.appendValueInput('A')
          .setCheck('Boolean')
          .appendField('');
        this.appendDummyInput('COMPARISON')
          .appendField(new Blockly.FieldDropdown([
            ['and', 'AND'],
            ['or', 'OR'],
            ['not', 'NOT']
          ], this.updateShape.bind(this)), 'COMPARISON');
        this.appendValueInput('B')
          .setCheck('Boolean')
          .appendField('');
        this.setOutput(true, 'Boolean');
        this.setColour(toolboxColors.Math);
        this.setInputsInline(true)
        this.updateShape(this.getFieldValue('COMPARISON'));
      },
      mutationToDom: function () {
        const container = document.createElement('mutation');
        container.setAttribute('comparison', this.getFieldValue('COMPARISON'));
        return container;
      },
      domToMutation: function (xmlElement) {
        this.updateShape(xmlElement.getAttribute('comparison'));
      },
      updateShape: function (op) {
        if (op === 'NOT') {
          if (this.getInput('A')) {
            this.removeInput('A');
          }
        } else {
          if (!this.getInput('A')) {
            this.appendValueInput('A')
              .setCheck('Boolean')
              .appendField('');
            this.moveInputBefore('A', 'COMPARISON');
          }
        }
      }
    };

    const workspace = Blockly.inject(blocklyRef.current, {
      readOnly: readonly,
      toolbox: toolbox,
      sounds: false,
      renderer: 'zelos',
      grid: {
        spacing: 40,
        length: 3,
        colour: 'rgba(255, 255, 255, 0.10)',
        snap: false,
      },
      move: {
        scrollbars: {horizontal: true, vertical: true},
        drag: true,
        wheel: true
      },
      theme: DarkTheme,
      comments: true,
      trashcan: true,
      zoom:{
          controls: true,
          wheel: false,
          startScale: 0.75,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true
        },
    })
    workspace.registerButtonCallback('createGameEvent', (button) => {
      alert('this would make a popup to make a game event.')
    })
    window.Blockly = Blockly
    window.BlocklyWorkspace = workspace
  })
  return (
    <div
    className='blocklyDiv'
    ref={blocklyRef}
    style={{
      width:'100vw',
      height:'100vh',
      display: 'absolute',
      margin: 0,
      padding: 0}}
    ></div>
  );
}